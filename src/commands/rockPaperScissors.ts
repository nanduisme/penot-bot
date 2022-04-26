import {
    SlashCommandBuilder,
    SlashCommandIntegerOption,
} from "@discordjs/builders";
import { Command } from "../interfaces/Command";

export const rps: Command = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Play rock paper scissors with the bot!")
        .addIntegerOption(
            new SlashCommandIntegerOption()
                .setName("rounds")
                .setDescription("The number of rounds to play. Default: 3")
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(10)
        ),
    run: async (interaction) => {
        // Get the number of rounds to play
        let rounds = interaction.options.getInteger("rounds", false);
        if (rounds === undefined) {
            rounds = 3;
        }
        
        
    },
};
