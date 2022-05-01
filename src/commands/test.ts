import {
    SlashCommandBuilder,
    SlashCommandUserOption,
} from "@discordjs/builders";
import UserModel from "../database/models/UserModel";
import { Command } from "../interfaces/Command";

export const test: Command = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test command")
        .addUserOption(
            new SlashCommandUserOption()
                .setName("user")
                .setDescription("The user to test")
                .setRequired(true)
        ),
    run: async (interaction) => {
        await interaction.deferReply();

        const user = interaction.options.getUser("user", true);
        interaction.editReply(`<@${user.id}> was mentioned in the command`);

        const userData = await UserModel.findOne({ discordId: user.id });
        if (userData) {
            interaction.followUp(`${userData.name} is in the database! \`\`\`${userData}\`\`\``);
        } else {
            interaction.followUp(`${user.username} is not in the database! Creating new user...`);
            const newUser = new UserModel({
                discordId: user.id
            });

            await newUser.save();
            interaction.followUp(`${user.username} was created!`);
        }
    },
};
