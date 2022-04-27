import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";

export const hello: Command = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Say hello to the bot"),
    run: async (interaction) => {
        interaction.editReply(`Hello there <@${interaction.user.id}>!`);
    },
};
