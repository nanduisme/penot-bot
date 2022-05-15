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
exports.math = void 0;
const builders_1 = require("@discordjs/builders");
exports.math = {
    data: new builders_1.SlashCommandBuilder()
        .setName("math")
        .setDescription("Do basic math operations")
        .addSubcommand(new builders_1.SlashCommandSubcommandBuilder()
        .setName("add")
        .setDescription("Add two numbers")
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("a")
        .setDescription("The first number")
        .setRequired(true))
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("b")
        .setDescription("The second number")
        .setRequired(true)))
        .addSubcommand(new builders_1.SlashCommandSubcommandBuilder()
        .setName("sub")
        .setDescription("Subtract one number from another")
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("a")
        .setDescription("The first number")
        .setRequired(true))
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("b")
        .setDescription("The second number")
        .setRequired(true)))
        .addSubcommand(new builders_1.SlashCommandSubcommandBuilder()
        .setName("mult")
        .setDescription("Multiply two numbers")
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("a")
        .setDescription("The first number")
        .setRequired(true))
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("b")
        .setDescription("The second number")
        .setRequired(true)))
        .addSubcommand(new builders_1.SlashCommandSubcommandBuilder()
        .setName("div")
        .setDescription("Divide one number by another")
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("a")
        .setDescription("The first number")
        .setRequired(true))
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("b")
        .setDescription("The second number")
        .setRequired(true)))
        .addSubcommand(new builders_1.SlashCommandSubcommandBuilder()
        .setName("sqr")
        .setDescription("Square a number")
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("a")
        .setDescription("The number")
        .setRequired(true)))
        .addSubcommand(new builders_1.SlashCommandSubcommandBuilder()
        .setName("sqrt")
        .setDescription("Square root a number")
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("a")
        .setDescription("The number")
        .setRequired(true)))
        .addSubcommand(new builders_1.SlashCommandSubcommandBuilder()
        .setName("pow")
        .setDescription("Raise a number to a power")
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("a")
        .setDescription("The number")
        .setRequired(true))
        .addNumberOption(new builders_1.SlashCommandNumberOption()
        .setName("b")
        .setDescription("The power")
        .setRequired(true))),
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
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
                interaction.editReply(`**\`${a2}\` - \`${b2}\` = \`${a2 - b2}\`**`);
                break;
            case "mult":
                const a3 = interaction.options.getNumber("a", true);
                const b3 = interaction.options.getNumber("b", true);
                interaction.editReply(`**\`${a3}\` x \`${b3}\` = \`${a3 * b3}\`**`);
                break;
            case "div":
                const a4 = interaction.options.getNumber("a", true);
                const b4 = interaction.options.getNumber("b", true);
                interaction.editReply(`**\`${a4}\` ÷ \`${b4}\` = \`${a4 / b4}\`**`);
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
                interaction.editReply(`**\`${a7}\`^\`${b7}\` = \`${Math.pow(a7, b7)}\`**`);
                break;
        }
    }),
};
//# sourceMappingURL=math.js.map