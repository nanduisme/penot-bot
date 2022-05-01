import {
    SlashCommandBuilder,
    SlashCommandUserOption,
} from "@discordjs/builders";
import { MessageActionRow, MessageButton } from "discord.js";
import { Command } from "../interfaces/Command";
import { getUserData } from "../modules/getUserData";
import { setGame } from "../modules/setUserData";
import { xoWinCheck } from "../modules/xoLogic";

export const xo: Command = {
    data: new SlashCommandBuilder()
        .setName("xo")
        .setDescription("Play a game of Tic Tac Toe with another player!")
        .addUserOption(
            new SlashCommandUserOption()
                .setName("player")
                .setDescription("Mention P2")
                .setRequired(true)
        ),
    isGame: true,
    run: async (interaction) => {
        const P1 = interaction.user;
        const P2 = interaction.options.getUser("player", true);
        const P1Data = await getUserData(P1.id);
        const P2Data = await getUserData(P2.id);

        // Delete this line in deployement
        await setGame(P2.id, "null");

        if (P2Data.isInGame()) {
            await interaction.editReply(
                `<@${P2.id}> is already in a game! Use \`/leavegames\` to leave all games.`
            );

            setGame(P1.id, "null");
            return;
        } else {
            setGame(P1.id, "xo");
            setGame(P2.id, "xo");
        }

        const xoBoard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];

        let p1turn = true;

        const gameMessage = {
            content: `<@${p1turn ? P1.id : P2?.id}>'s turn!`,
            components: [
                new MessageActionRow().setComponents([
                    new MessageButton()
                        .setCustomId("11")
                        .setLabel("_")
                        .setStyle("SECONDARY"),

                    new MessageButton()
                        .setCustomId("12")
                        .setLabel("_")
                        .setStyle("SECONDARY"),

                    new MessageButton()
                        .setCustomId("13")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                ]),

                new MessageActionRow().setComponents([
                    new MessageButton()
                        .setCustomId("21")
                        .setLabel("_")
                        .setStyle("SECONDARY"),

                    new MessageButton()
                        .setCustomId("22")
                        .setLabel("_")
                        .setStyle("SECONDARY"),

                    new MessageButton()
                        .setCustomId("23")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                ]),

                new MessageActionRow().setComponents([
                    new MessageButton()
                        .setCustomId("31")
                        .setLabel("_")
                        .setStyle("SECONDARY"),

                    new MessageButton()
                        .setCustomId("32")
                        .setLabel("_")
                        .setStyle("SECONDARY"),

                    new MessageButton()
                        .setCustomId("33")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                ]),
            ],
        };

        let timedOut = false;
        let timeoutMessageSent = false;
        let gameWon = false;
        let isNotDraw = false;

        const play = async (): Promise<boolean | undefined | any> => {
            await interaction.editReply(gameMessage);
            interaction.channel
                ?.awaitMessageComponent({
                    filter: (i) => {
                        return i.user.id === P1.id || i.user.id === P2.id;
                    },
                    time: 20000,
                })
                .then(async (i) => {
                    if (
                        (p1turn && P1.id !== i.user.id) ||
                        (!p1turn && P2.id !== i.user.id)
                    ) {
                        await i.reply({
                            content: `<@${i.user.id}> it is not your turn!`,
                            ephemeral: true,
                        });
                        return;
                    }

                    i.deferUpdate();

                    const [row, col] = [
                        (i.customId[0] as unknown as number) - 1,
                        (i.customId[1] as unknown as number) - 1,
                    ];
                    xoBoard[row][col] = p1turn ? 1 : 2;
                    if (p1turn) {
                        gameMessage.components[row].components[col] =
                            new MessageButton()
                                .setCustomId(`${i.customId}!`)
                                .setLabel("X")
                                .setStyle("PRIMARY")
                                .setDisabled(true);
                    } else {
                        gameMessage.components[row].components[col] =
                            new MessageButton()
                                .setCustomId(`${i.customId}!`)
                                .setLabel("O")
                                .setStyle("DANGER")
                                .setDisabled(true);
                    }

                    const win = xoWinCheck(xoBoard, p1turn ? 1 : 2);

                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (xoBoard[i][j] === 0) {
                                isNotDraw = true;
                            }
                        }
                    }

                    if (win) {
                        gameWon = true;
                    } else {
                        p1turn = !p1turn;
                        gameMessage.content = `<@${p1turn ? P1.id : P2?.id
                            }>'s turn!`;
                        await interaction.editReply(gameMessage);
                        return;
                    }
                })
                .catch(async (e) => {
                    timedOut = true;
                })
                .finally(async () => {
                    if (timedOut && !timeoutMessageSent) {
                        gameMessage.components.map((row) =>
                            row.components.map((button) =>
                                button.setDisabled(true)
                            )
                        ),
                            await interaction.editReply({
                                content: `<@${p1turn ? P1.id : P2?.id
                                    }> has timed out!`,
                                components: gameMessage.components,
                            });
                        timeoutMessageSent = true;
                        setGame(P1.id, "null");
                        setGame(P2.id, "null");
                        return;
                    }

                    if (!isNotDraw && !gameWon) {
                        gameMessage.components.map((row) =>
                            row.components.map((button) =>
                                button.setDisabled(true)
                            )
                        ),
                            await interaction.editReply({
                                content: `<@${p1turn ? P1.id : P2?.id
                                    }> has won!`,
                                components: gameMessage.components,
                            }),
                            await interaction.editReply({
                                content: `It's a draw!`,
                                components: gameMessage.components,
                            });

                        setGame(P1.id, "null");
                        setGame(P2.id, "null");
                        return;
                    }

                    if (gameWon) {
                        gameMessage.components.map((row) =>
                            row.components.map((button) =>
                                button.setDisabled(true)
                            )
                        ),
                            await interaction.editReply({
                                content: `<@${p1turn ? P1.id : P2?.id
                                    }> has won!`,
                                components: gameMessage.components,
                            }),
                            setGame(P1.id, "null");
                        setGame(P2.id, "null");
                        return;
                    } else {
                        play();
                    }
                });
        };
        play();
    },
};
