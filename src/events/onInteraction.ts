import { Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { getUserData } from "../modules/getUserData";
import { setGame } from "../modules/setUserData";

export const onInteraction = async (interaction: Interaction) => {
    if (interaction.isCommand()) {
        for (const Command of CommandList) {
            if (interaction.commandName === Command.data.name) {
                if (Command.isGame) {
                    await interaction.deferReply();

                    // Check if player is in a game already
                    const userData = await getUserData(interaction.user.id);
                    if (userData.isInGame()) {
                        await interaction.editReply(
                            `You are already in a game (${userData.currentGame})! Use \`/leavegames\` to leave your current game.`
                        );
                        return;
                    } else {
                        setGame(
                            interaction.user.id,
                            Command.data.name as "xo" | "rps"
                        );
                    }
                }
                await Command.run(interaction);
                return;
            }
        }
    }
};
