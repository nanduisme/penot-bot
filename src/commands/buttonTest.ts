import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton } from "discord.js";
import { Command } from "../interfaces/Command";

export const button: Command = {
    data: new SlashCommandBuilder()
        .setName("button")
        .setDescription("Click a button please!"),

    run: async (interaction) => {
        await interaction.deferReply();

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

        await interaction.editReply(message);

        const collector = interaction.channel?.createMessageComponentCollector({
            filter: (msg) => msg.user.id === interaction.user.id,
            time: 15000,
        });

        let count = 0;
        let collectorStopped = false;

        collector?.on("collect", async (i) => {
            await interaction.editReply(
                `You clicked button ${i.customId}! Count: ${++count}`
            );
            await i.deferUpdate();

            if (count === 3) {
                collector?.stop();
                disableButtons(message);
                await interaction.editReply({content: "You clicked 3 times!", components: message.components});
                collectorStopped = true;
            }
        });

        collector?.on("end", async (i) => {
            if (!collectorStopped) { 
                return
            }

            disableButtons(message);

            await interaction.editReply({
                content: `You clicked ${count} times! Times up!`,
                components: message.components,
            });
        });
    },
};

function disableButtons(message: { content: string; components: MessageActionRow[]; }) {
    for (const row of message.components) {
        for (const button of row.components) {
            button.setDisabled(true);
        }
    }
}

