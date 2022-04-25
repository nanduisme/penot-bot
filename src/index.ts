import { Client } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { IntentOptions } from "./config/IntentOptions";
import onReady from "./events/onReady"
import { onInteraction } from "./events/onInteraction";

const { TOKEN } = require("dotenv").config().parsed;

(async () => {
    const client = new Client({
        intents: IntentOptions
    });

    await connectDatabase();

    client.on("ready", async () => await onReady(client));
    client.on("interactionCreate", (interaction) => onInteraction(interaction))

    await client.login(TOKEN);
})();