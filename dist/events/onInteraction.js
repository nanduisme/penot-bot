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
exports.onInteraction = void 0;
const _CommandList_1 = require("../commands/_CommandList");
const getUserData_1 = require("../modules/getUserData");
const setUserData_1 = require("../modules/setUserData");
const onInteraction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.isCommand()) {
        for (const Command of _CommandList_1.CommandList) {
            if (interaction.commandName === Command.data.name) {
                if (Command.isGame) {
                    yield interaction.deferReply();
                    // Check if player is in a game already
                    const userData = yield (0, getUserData_1.getUserData)(interaction.user.id);
                    if (userData.isInGame()) {
                        yield interaction.editReply(`You are already in a game (${userData.currentGame})! Use \`/leavegames\` to leave your current game.`);
                        return;
                    }
                    else {
                        (0, setUserData_1.setGame)(interaction.user.id, Command.data.name);
                    }
                }
                yield Command.run(interaction);
                return;
            }
        }
    }
});
exports.onInteraction = onInteraction;
//# sourceMappingURL=onInteraction.js.map