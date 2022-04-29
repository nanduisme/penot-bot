import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { getUserData } from "../modules/getUserData";
import { setGame } from "../modules/setUserData";

export const leavegames: Command = {
    data: new SlashCommandBuilder()
        .setName("leavegames")
        .setDescription(
            "Leave the current game you are in to join a different one."
        ),
    run: async (interaction) => {
        await interaction.deferReply();

        const userData = await getUserData(interaction.user.id);
        if (!userData.isInGame) {
            await interaction.editReply(`You are not in a game!`);
            return;
        } else {
            setGame(interaction.user.id, "null");
            await interaction.editReply("You have left the game!");
        }
    },
};
