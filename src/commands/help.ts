import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";

export const help: Command = {
    data: new SlashCommandBuilder()
        .setName("helllo")
        .setDescription("A help command for this bot."),
    run: async (interaction) => {
        interaction.deferReply()
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setColor(0x7c5add)
                    .setTitle("Help Menu")
                    .setDescription("`/help``/math``/ping``/xo``/rps``/leavegame`")
            ]
        })
    },
}