import {
    SlashCommandBuilder,
    SlashCommandIntegerOption,
} from "@discordjs/builders";
import { Command } from "../interfaces/Command";

export const sum: Command = {
    data: new SlashCommandBuilder()
        .setName("sum")
        .setDescription("Sum two numbers")
        .addIntegerOption(
            new SlashCommandIntegerOption()
                .setName("a")
                .setDescription("The first number")
                .setRequired(true)
        )
        .addIntegerOption(
            new SlashCommandIntegerOption()
                .setName("b")
                .setDescription("The second number")
                .setRequired(true)
        ),
    run: async (interaction) => {
        const a = interaction.options.getInteger("a", true);
        const b = interaction.options.getInteger("b", true);

        interaction.reply(`The sum of \`${a}\` and \`${b}\` is \`${a + b}\``);
    },
};
