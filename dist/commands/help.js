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
exports.help = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.help = {
    data: new builders_1.SlashCommandBuilder()
        .setName("helllo")
        .setDescription("A help command for this bot."),
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        interaction.deferReply();
        yield interaction.editReply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setColor(0x7c5add)
                    .setTitle("Help Menu")
                    .setDescription("`/help``/math``/ping``/xo``/rps``/leavegame`")
            ]
        });
    }),
};
//# sourceMappingURL=help.js.map