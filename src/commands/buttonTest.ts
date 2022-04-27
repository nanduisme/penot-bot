import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton } from "discord.js";
import { Command } from "../interfaces/Command";

export const button: Command = {
    data: new SlashCommandBuilder()
        .setName("button")
        .setDescription("Click a button please!"),

    run: async (interaction) => {
        const message = {
            content: "Click a button!",
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton()
                        .setCustomId("primary")
                        .setStyle("PRIMARY")
                        .setLabel("Primary"),

                    new MessageButton()
                        .setCustomId("secondary")
                        .setStyle("SECONDARY")
                        .setLabel("Secondary"),

                    new MessageButton()
                        .setCustomId("success")
                        .setStyle("SUCCESS")
                        .setLabel("Success"),

                    new MessageButton()
                        .setCustomId("danger")
                        .setStyle("DANGER")
                        .setLabel("Danger"),
                ]),
            ],
        };

        await interaction.reply(message);

        const collector = interaction.channel?.createMessageComponentCollector({
            filter: (msg) => msg.user.id === interaction.user.id,
            time: 15000,
        });

        collector?.on("collect", async (i) => {
            await interaction.editReply(`You clicked button ${i.customId}!`);
            await i.deferUpdate();
        });
    },
};
