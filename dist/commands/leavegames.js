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
exports.leavegames = void 0;
const builders_1 = require("@discordjs/builders");
const getUserData_1 = require("../modules/getUserData");
const setUserData_1 = require("../modules/setUserData");
exports.leavegames = {
    data: new builders_1.SlashCommandBuilder()
        .setName("leavegames")
        .setDescription("Leave the current game you are in to join a different one."),
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
        const userData = yield (0, getUserData_1.getUserData)(interaction.user.id);
        if (!userData.isInGame()) {
            yield interaction.editReply(`You are not in a game!`);
            return;
        }
        else {
            (0, setUserData_1.setGame)(interaction.user.id, "null");
            yield interaction.editReply("You have left the game!");
        }
    }),
};
//# sourceMappingURL=leavegames.js.map