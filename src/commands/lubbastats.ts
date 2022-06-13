import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";

export const lubbastats: Command = {
    data: new SlashCommandBuilder()
        .setName("lubbastats")
        .setDescription("Get stats of time lubbas been sett <3"),
    run: async (interaction) => {
        await interaction.deferReply();
        let settDate = new Date(Date.parse("2020-09-09"));
        let yearsSinceSett = Math.floor(
            (Date.now() - settDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
        );
        let monthsSinceSett = Math.floor(
            (Date.now() - settDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
        );
        let daysSinceSett = Math.floor(
            (Date.now() - settDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        let hoursSinceSett = Math.floor(
            (Date.now() - settDate.getTime()) / (1000 * 60 * 60)
        );
        let minutesSinceSett = Math.floor(
            (Date.now() - settDate.getTime()) / (1000 * 60)
        );
        let secondsSinceSett = Math.floor(
            (Date.now() - settDate.getTime()) / 1000
        );

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
                            name: "or Months",
                            value: `\`${monthsSinceSett}\``,
                            inline: true,
                        },
                        {
                            name: "or Days",
                            value: `\`${daysSinceSett}\``,
                            inline: true,
                        },
                        {
                            name: "or Hours",
                            value: `\`${hoursSinceSett}\``,
                            inline: true,
                        },
                        {
                            name: "or Minutes",
                            value: `\`${minutesSinceSett}\``,
                            inline: true,
                        },
                        {
                            name: "or Seconds",
                            value: `\`${secondsSinceSett}\``,
                            inline: true,
                        },
                    ]),
            ],
        });
    },
};
