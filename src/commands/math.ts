import {
    SlashCommandBuilder,
    SlashCommandNumberOption,
    SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import { Command } from "../interfaces/Command";

export const math: Command = {
    data: new SlashCommandBuilder()
        .setName("math")
        .setDescription("Do basic math operations")
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("add")
                .setDescription("Add two numbers")
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("a")
                        .setDescription("The first number")
                        .setRequired(true)
                )
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("b")
                        .setDescription("The second number")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("sub")
                .setDescription("Subtract one number from another")
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("a")
                        .setDescription("The first number")
                        .setRequired(true)
                )
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("b")
                        .setDescription("The second number")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("mult")
                .setDescription("Multiply two numbers")
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("a")
                        .setDescription("The first number")
                        .setRequired(true)
                )
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("b")
                        .setDescription("The second number")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("div")
                .setDescription("Divide one number by another")
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("a")
                        .setDescription("The first number")
                        .setRequired(true)
                )
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("b")
                        .setDescription("The second number")
                        .setRequired(true)
                )
        ),
    run: async (interaction) => {
        if (!interaction.options.getSubcommand()) {
            interaction.reply("You need to specify a subcommand!");
            return;
        }

        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "add":
                const a = interaction.options.getNumber("a", true);
                const b = interaction.options.getNumber("b", true);

                interaction.reply(`**\`${a}\` + \`${b}\` = \`${a + b}\`**`);
                break;
            case "sub":
                const a2 = interaction.options.getNumber("a", true);
                const b2 = interaction.options.getNumber("b", true);

                interaction.reply(`**\`${a2}\` - \`${b2}\` = \`${a2 - b2}\`**`);
                break;
            case "mult":
                const a3 = interaction.options.getNumber("a", true);
                const b3 = interaction.options.getNumber("b", true);

                interaction.reply(`**\`${a3}\` x \`${b3}\` = \`${a3 * b3}\`**`);
                break;
            case "div":
                const a4 = interaction.options.getNumber("a", true);
                const b4 = interaction.options.getNumber("b", true);

                interaction.reply(`**\`${a4}\` ÷ \`${b4}\` = \`${a4 / b4}\`**`);
                break;
        }
    },
};
