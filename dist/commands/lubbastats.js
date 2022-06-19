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
exports.lubbastats = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.lubbastats = {
    data: new builders_1.SlashCommandBuilder()
        .setName("lubbastats")
        .setDescription("Get stats of time lubbas been sett <3"),
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
        const settDate = new Date(Date.parse("2020-09-09"));
        const dateDiff = Date.now() - settDate.getTime();
        const secondsSinceSett = Math.floor(dateDiff / 1000);
        const minutesSinceSett = Math.floor(secondsSinceSett / 60);
        const hoursSinceSett = Math.floor(minutesSinceSett / 60);
        const daysSinceSett = Math.floor(hoursSinceSett / 24);
        const monthsSinceSett = Math.floor(daysSinceSett / 30);
        const yearsSinceSett = Math.floor(daysSinceSett / 365);
        yield interaction.editReply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setColor("#7C5ADD")
                    .setTitle("Lubba Stats")
                    .addFields([
                    {
                        name: "Years",
                        value: `\`${yearsSinceSett}\``,
                        inline: true,
                    },
                    {
                        name: "Months",
                        value: `\`${monthsSinceSett}\``,
                        inline: true,
                    },
                    {
                        name: "Days",
                        value: `\`${daysSinceSett}\``,
                        inline: true,
                    },
                    {
                        name: "Hours",
                        value: `\`${hoursSinceSett}\``,
                        inline: true,
                    },
                    {
                        name: "Minutes",
                        value: `\`${minutesSinceSett}\``,
                        inline: true,
                    },
                    {
                        name: "Seconds",
                        value: `\`${secondsSinceSett}\``,
                        inline: true,
                    },
                ]),
            ],
        });
    }),
};
//# sourceMappingURL=lubbastats.js.map