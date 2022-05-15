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
exports.xo = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const getUserData_1 = require("../modules/getUserData");
const setUserData_1 = require("../modules/setUserData");
const xoLogic_1 = require("../modules/xoLogic");
exports.xo = {
    data: new builders_1.SlashCommandBuilder()
        .setName("xo")
        .setDescription("Play a game of Tic Tac Toe with another player!")
        .addUserOption(new builders_1.SlashCommandUserOption()
        .setName("player")
        .setDescription("Mention P2")
        .setRequired(true)),
    isGame: true,
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const P1 = interaction.user;
        const P2 = interaction.options.getUser("player", true);
        const P1Data = yield (0, getUserData_1.getUserData)(P1.id);
        const P2Data = yield (0, getUserData_1.getUserData)(P2.id);
        // Delete this line in deployement
        yield (0, setUserData_1.setGame)(P2.id, "null");
        if (P2Data.isInGame()) {
            yield interaction.editReply(`<@${P2.id}> is already in a game! Use \`/leavegames\` to leave all games.`);
            (0, setUserData_1.setGame)(P1.id, "null");
            return;
        }
        else {
            (0, setUserData_1.setGame)(P1.id, "xo");
            (0, setUserData_1.setGame)(P2.id, "xo");
        }
        const xoBoard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        let p1turn = true;
        const gameMessage = {
            content: `<@${p1turn ? P1.id : P2 === null || P2 === void 0 ? void 0 : P2.id}>'s turn!`,
            components: [
                new discord_js_1.MessageActionRow().setComponents([
                    new discord_js_1.MessageButton()
                        .setCustomId("11")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                    new discord_js_1.MessageButton()
                        .setCustomId("12")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                    new discord_js_1.MessageButton()
                        .setCustomId("13")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                ]),
                new discord_js_1.MessageActionRow().setComponents([
                    new discord_js_1.MessageButton()
                        .setCustomId("21")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                    new discord_js_1.MessageButton()
                        .setCustomId("22")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                    new discord_js_1.MessageButton()
                        .setCustomId("23")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                ]),
                new discord_js_1.MessageActionRow().setComponents([
                    new discord_js_1.MessageButton()
                        .setCustomId("31")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                    new discord_js_1.MessageButton()
                        .setCustomId("32")
                        .setLabel("_")
                        .setStyle("SECONDARY"),
                    new discord_js_1.MessageButton()
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
        const play = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            yield interaction.editReply(gameMessage);
            (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.awaitMessageComponent({
                filter: (i) => {
                    return i.user.id === P1.id || i.user.id === P2.id;
                },
                time: 20000,
            }).then((i) => __awaiter(void 0, void 0, void 0, function* () {
                if ((p1turn && P1.id !== i.user.id) ||
                    (!p1turn && P2.id !== i.user.id)) {
                    yield i.reply({
                        content: `<@${i.user.id}> it is not your turn!`,
                        ephemeral: true,
                    });
                    return;
                }
                i.deferUpdate();
                const [row, col] = [
                    i.customId[0] - 1,
                    i.customId[1] - 1,
                ];
                xoBoard[row][col] = p1turn ? 1 : 2;
                if (p1turn) {
                    gameMessage.components[row].components[col] =
                        new discord_js_1.MessageButton()
                            .setCustomId(`${i.customId}!`)
                            .setLabel("X")
                            .setStyle("PRIMARY")
                            .setDisabled(true);
                }
                else {
                    gameMessage.components[row].components[col] =
                        new discord_js_1.MessageButton()
                            .setCustomId(`${i.customId}!`)
                            .setLabel("O")
                            .setStyle("DANGER")
                            .setDisabled(true);
                }
                const win = (0, xoLogic_1.xoWinCheck)(xoBoard, p1turn ? 1 : 2);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (xoBoard[i][j] === 0) {
                            isNotDraw = true;
                        }
                    }
                }
                if (win) {
                    gameWon = true;
                }
                else {
                    p1turn = !p1turn;
                    gameMessage.content = `<@${p1turn ? P1.id : P2 === null || P2 === void 0 ? void 0 : P2.id}>'s turn!`;
                    yield interaction.editReply(gameMessage);
                    return;
                }
            })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                timedOut = true;
            })).finally(() => __awaiter(void 0, void 0, void 0, function* () {
                if (timedOut && !timeoutMessageSent) {
                    gameMessage.components.map((row) => row.components.map((button) => button.setDisabled(true))),
                        yield interaction.editReply({
                            content: `<@${p1turn ? P1.id : P2 === null || P2 === void 0 ? void 0 : P2.id}> has timed out!`,
                            components: gameMessage.components,
                        });
                    timeoutMessageSent = true;
                    (0, setUserData_1.setGame)(P1.id, "null");
                    (0, setUserData_1.setGame)(P2.id, "null");
                    return;
                }
                if (!isNotDraw && !gameWon) {
                    gameMessage.components.map((row) => row.components.map((button) => button.setDisabled(true))),
                        yield interaction.editReply({
                            content: `<@${p1turn ? P1.id : P2 === null || P2 === void 0 ? void 0 : P2.id}> has won!`,
                            components: gameMessage.components,
                        }),
                        yield interaction.editReply({
                            content: `It's a draw!`,
                            components: gameMessage.components,
                        });
                    (0, setUserData_1.setGame)(P1.id, "null");
                    (0, setUserData_1.setGame)(P2.id, "null");
                    return;
                }
                if (gameWon) {
                    gameMessage.components.map((row) => row.components.map((button) => button.setDisabled(true))),
                        yield interaction.editReply({
                            content: `<@${p1turn ? P1.id : P2 === null || P2 === void 0 ? void 0 : P2.id}> has won!`,
                            components: gameMessage.components,
                        }),
                        (0, setUserData_1.setGame)(P1.id, "null");
                    (0, setUserData_1.setGame)(P2.id, "null");
                    return;
                }
                else {
                    play();
                }
            }));
        });
        play();
    }),
};
//# sourceMappingURL=xo.js.map