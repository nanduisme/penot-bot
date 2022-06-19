import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";

export const lubbastats: Command = {
    data: new SlashCommandBuilder()
        .setName("lubbastats")
        .setDescription("Get stats of time lubbas been sett <3"),
    run: async (interaction) => {
        await interaction.deferReply();
        const settDate = new Date(Date.parse("2020-09-09"));
        const dateDiff = Date.now() - settDate.getTime()
        const secondsSinceSett = Math.floor(dateDiff / 1000);
        const minutesSinceSett = Math.floor(secondsSinceSett / 60);
        const hoursSinceSett = Math.floor(minutesSinceSett / 60);
        const daysSinceSett = Math.floor(hoursSinceSett / 24);
        const monthsSinceSett = Math.floor(daysSinceSett / 30);
        const yearsSinceSett = Math.floor(daysSinceSett / 365);

        await interaction.editReply({
            embeds: [
                new MessageEmbed()
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
    },
};
