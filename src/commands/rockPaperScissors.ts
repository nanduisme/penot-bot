import {
    SlashCommandBuilder,
    SlashCommandIntegerOption,
} from "@discordjs/builders";
import {
    ColorResolvable,
    MessageActionRow,
    MessageButton,
    MessageComponentInteraction,
    MessageEmbed,
} from "discord.js";
import { Command } from "../interfaces/Command";
import { getUserData } from "../modules/getUserData";
import {
    botChoice,
    rpsIntTotString,
    rpsLogic,
    rpsStringToInt,
} from "../modules/rpsLogic";
import { setGame } from "../modules/setUserData";

export const rps: Command = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Play rock paper scissors with the bot!")
        .addIntegerOption(
            new SlashCommandIntegerOption()
                .setName("points")
                .setDescription("The number of points to win. Default: 10")
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(20)
        ),
    isGame: true,
    run: async (interaction) => {
        // Get the number of rounds to play
        let points = interaction.options.getInteger("points", false);
        if (!points) {
            points = 3;
        }

        let playerScore = 0;
        let botScore = 0;

        let prompt = "Rock, paper, or scissors?";

        const gameMessage = {
            embeds: [
                new MessageEmbed()
                    .setColor("#7C5ADD")
                    .setTitle("Rock Paper Scissors!")
                    .addFields([
                        {
                            name: "Game",
                            value: prompt,
                            inline: false,
                        },
                        {
                            name: "YOU",
                            value: `${playerScore}`,
                            inline: true,
                        },
                        {
                            name: "BOT",
                            value: `${botScore}`,
                            inline: true,
                        },
                    ])
                    .setFooter({
                        text: `${interaction.user.username} vs. Bot (Points to win: ${points})`,
                    }),
            ],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton()
                        .setCustomId("rock")
                        .setLabel("🤜")
                        .setStyle("PRIMARY"),

                    new MessageButton()
                        .setCustomId("paper")
                        .setLabel("🤚")
                        .setStyle("PRIMARY"),

                    new MessageButton()
                        .setCustomId("scissors")
                        .setLabel("✌️")
                        .setStyle("PRIMARY"),
                ]),
            ],
        };

        let timedout = false;
        let timeoutMessageSent = false;

        const play = async (): Promise<boolean | undefined> => {
            if (
                playerScore >= (points as number) ||
                botScore >= (points as number) ||
                timedout
            ) {
                return true;
            }

            // Send game embed
            await interaction.editReply(gameMessage);
            const interactionFilter = (i: MessageComponentInteraction) => {
                i.deferUpdate();
                return (
                    i.user.id === interaction.user.id &&
                    getUserData(i.user.id).then((user) => user.isInGame())
                );
            };

            interaction.channel
                ?.awaitMessageComponent({
                    filter: interactionFilter,
                    time: 15000,
                    componentType: "BUTTON",
                })
                .then((press) => {
                    // Generate bot play
                    const botsChoice = botChoice();
                    const playerChoice = rpsStringToInt(press.customId);
                    const botsPlay = rpsIntTotString(botsChoice);

                    const result = rpsLogic(playerChoice, botsChoice);

                    // Update scores and prompt
                    if (result === 1) {
                        gameMessage.embeds[0].fields[0].value = `You scored! I chose **\`${botsPlay}\`** and you chose **\`${press.customId}\`**!`;
                        gameMessage.embeds[0].fields[1].value = `${++playerScore}`;
                    } else if (result === 2) {
                        gameMessage.embeds[0].fields[0].value = `I scored! I chose **\`${botsPlay}\`** and you chose **\`${press.customId}\`**!`;
                        gameMessage.embeds[0].fields[2].value = `${++botScore}`;
                    } else {
                        gameMessage.embeds[0].fields[0].value = `It's a tie! We both chose **\`${press.customId}\`**!`;
                    }
                })
                .catch(() => {
                    timedout = true;
                })
                .finally(async () => {
                    if (timedout && !timeoutMessageSent) {
                        const timeoutMessage = {
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#ff0000")
                                    .setTitle("Rock Paper Scissors!")
                                    .setDescription(
                                        `You took too long to respond!`
                                    ),
                            ],
                            components: [],
                        };

                        await interaction.editReply(timeoutMessage);
                        timeoutMessageSent = true;
                        setGame(interaction.user.id, "null");
                        return;
                    }

                    if (
                        await play()
                            .then((res) => res)
                            .catch(() => false)
                    ) {
                        // Send the final game embed
                        let embedColor = "#7C5ADD";
                        let embedTitle = "It was a tie!";
                        let embedDescription = `YOU (**${playerScore}**) vs. BOT (**${botScore}**)`;

                        if (playerScore > botScore) {
                            embedColor = "#00FF00";
                            embedTitle = "You won!";
                        } else if (playerScore < botScore) {
                            embedColor = "#FF0000";
                            embedTitle = "You lost!";
                        }

                        const finalMessage = {
                            embeds: [
                                new MessageEmbed()
                                    .setColor(embedColor as ColorResolvable)
                                    .setTitle(embedTitle)
                                    .setDescription(embedDescription),
                            ],
                            components: [],
                        };

                        interaction.editReply(finalMessage);
                        setGame(interaction.user.id, "null");
                        return;
                    }
                });
        };

        await play();
    },
};
