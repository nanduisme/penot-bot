import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Client } from "discord.js";
import { CommandList } from "../commands/_CommandList";

const TOKEN = require("dotenv").config().parsed.TOKEN;
const GUILD_ID = require("dotenv").config().parsed.GUILD_ID;

export default async (client: Client) => {
    const rest = new REST({ version: "9" })
        .setToken(TOKEN as string);

    const commandData = CommandList.map(command => command.data.toJSON());

    await rest.put(
        Routes.applicationGuildCommands(
            client.user?.id || "missing id",
            GUILD_ID as string
        ),
        { body: commandData }
    )

    console.log(`Logged in to Discord!`);
}

