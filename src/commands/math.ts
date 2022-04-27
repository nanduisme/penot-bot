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
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("sqr")
                .setDescription("Square a number")
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("a")
                        .setDescription("The number")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("sqrt")
                .setDescription("Square root a number")
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("a")
                        .setDescription("The number")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("pow")
                .setDescription("Raise a number to a power")
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("a")
                        .setDescription("The number")
                        .setRequired(true)
                )
                .addNumberOption(
                    new SlashCommandNumberOption()
                        .setName("b")
                        .setDescription("The power")
                        .setRequired(true)
                )
        ),
    run: async (interaction) => {
        await interaction.deferReply();

        if (!interaction.options.getSubcommand()) {
            interaction.editReply("You need to specify a subcommand!");
            return;
        }

        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "add":
                const a = interaction.options.getNumber("a", true);
                const b = interaction.options.getNumber("b", true);

                interaction.editReply(`**\`${a}\` + \`${b}\` = \`${a + b}\`**`);
                break;

            case "sub":
                const a2 = interaction.options.getNumber("a", true);
                const b2 = interaction.options.getNumber("b", true);

                interaction.editReply(
                    `**\`${a2}\` - \`${b2}\` = \`${a2 - b2}\`**`
                );
                break;

            case "mult":
                const a3 = interaction.options.getNumber("a", true);
                const b3 = interaction.options.getNumber("b", true);

                interaction.editReply(
                    `**\`${a3}\` x \`${b3}\` = \`${a3 * b3}\`**`
                );
                break;

            case "div":
                const a4 = interaction.options.getNumber("a", true);
                const b4 = interaction.options.getNumber("b", true);

                interaction.editReply(
                    `**\`${a4}\` ÷ \`${b4}\` = \`${a4 / b4}\`**`
                );
                break;

            case "sqr":
                const a5 = interaction.options.getNumber("a", true);

                interaction.editReply(`**\`${a5}\`² = \`${a5 * a5}\`**`);
                break;

            case "sqrt":
                const a6 = interaction.options.getNumber("a", true);

                interaction.editReply(`**√\`${a6}\` = \`${Math.sqrt(a6)}\`**`);
                break;

            case "pow":
                const a7 = interaction.options.getNumber("a", true);
                const b7 = interaction.options.getNumber("b", true);

                interaction.editReply(
                    `**\`${a7}\`^\`${b7}\` = \`${Math.pow(a7, b7)}\`**`
                );
                break;
        }
    },
};
