import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";

export const ping: Command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Find latency of bot and the API"),
    run: async (interaction) => {
        await interaction.deferReply();
        await interaction.editReply(
            `Pong! Latency is \`${Math.round(interaction.client.ws.ping)}ms\``
        );
    },
};
