"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rps = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const getUserData_1 = require("../modules/getUserData");
const rpsLogic_1 = require("../modules/rpsLogic");
const setUserData_1 = require("../modules/setUserData");
exports.rps = {
    data: new builders_1.SlashCommandBuilder()
        .setName("rps")
        .setDescription("Play rock paper scissors with the bot!")
        .addIntegerOption(new builders_1.SlashCommandIntegerOption()
        .setName("points")
        .setDescription("The number of points to win. Default: 10")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(20)),
    isGame: true,
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
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
                new discord_js_1.MessageEmbed()
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
                new discord_js_1.MessageActionRow().addComponents([
                    new discord_js_1.MessageButton()
                        .setCustomId("rock")
                        .setLabel("🤜")
                        .setStyle("PRIMARY"),
                    new discord_js_1.MessageButton()
                        .setCustomId("paper")
                        .setLabel("🤚")
                        .setStyle("PRIMARY"),
                    new discord_js_1.MessageButton()
                        .setCustomId("scissors")
                        .setLabel("✌️")
                        .setStyle("PRIMARY"),
                ]),
            ],
        };
        let timedout = false;
        let timeoutMessageSent = false;
        const play = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (playerScore >= points ||
                botScore >= points ||
                timedout) {
                return true;
            }
            // Send game embed
            yield interaction.editReply(gameMessage);
            const interactionFilter = (i) => {
                i.deferUpdate();
                return (i.user.id === interaction.user.id &&
                    (0, getUserData_1.getUserData)(i.user.id).then((user) => user.isInGame()));
            };
            (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.awaitMessageComponent({
                filter: interactionFilter,
                time: 15000,
                componentType: "BUTTON",
            }).then((press) => {
                // Generate bot play
                const botsChoice = (0, rpsLogic_1.botChoice)();
                const playerChoice = (0, rpsLogic_1.rpsStringToInt)(press.customId);
                const botsPlay = (0, rpsLogic_1.rpsIntTotString)(botsChoice);
                const result = (0, rpsLogic_1.rpsLogic)(playerChoice, botsChoice);
                // Update scores and prompt
                if (result === 1) {
                    gameMessage.embeds[0].fields[0].value = `You scored! I chose **\`${botsPlay}\`** and you chose **\`${press.customId}\`**!`;
                    gameMessage.embeds[0].fields[1].value = `${++playerScore}`;
                }
                else if (result === 2) {
                    gameMessage.embeds[0].fields[0].value = `I scored! I chose **\`${botsPlay}\`** and you chose **\`${press.customId}\`**!`;
                    gameMessage.embeds[0].fields[2].value = `${++botScore}`;
                }
                else {
                    gameMessage.embeds[0].fields[0].value = `It's a tie! We both chose **\`${press.customId}\`**!`;
                }
            }).catch(() => {
                timedout = true;
            }).finally(() => __awaiter(void 0, void 0, void 0, function* () {
                if (timedout && !timeoutMessageSent) {
                    const timeoutMessage = {
                        embeds: [
                            new discord_js_1.MessageEmbed()
                                .setColor("#ff0000")
                                .setTitle("Rock Paper Scissors!")
                                .setDescription(`You took too long to respond!`),
                        ],
                        components: [],
                    };
                    yield interaction.editReply(timeoutMessage);
                    timeoutMessageSent = true;
                    (0, setUserData_1.setGame)(interaction.user.id, "null");
                    return;
                }
                if (yield play()
                    .then((res) => res)
                    .catch(() => false)) {
                    // Send the final game embed
                    let embedColor = "#7C5ADD";
                    let embedTitle = "It was a tie!";
                    let embedDescription = `YOU (**${playerScore}**) vs. BOT (**${botScore}**)`;
                    if (playerScore > botScore) {
                        embedColor = "#00FF00";
                        embedTitle = "You won!";
                    }
                    else if (playerScore < botScore) {
                        embedColor = "#FF0000";
                        embedTitle = "You lost!";
                    }
                    const finalMessage = {
                        embeds: [
                            new discord_js_1.MessageEmbed()
                                .setColor(embedColor)
                                .setTitle(embedTitle)
                                .setDescription(embedDescription),
                        ],
                        components: [],
                    };
                    interaction.editReply(finalMessage);
                    (0, setUserData_1.setGame)(interaction.user.id, "null");
                    return;
                }
            }));
        });
        yield play();
    }),
};
//# sourceMappingURL=rockPaperScissors.js.map