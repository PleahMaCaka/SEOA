import { importx } from "@discordx/importer"
import { Client } from "discordx"
import "dotenv/config"
import { ALL_INTENTS } from "./utils/AllIntents"
import { Logger } from "./utils/Logger"

export const DEBUG: boolean = process.env.DEBUG === "true"

const client = new Client({
	intents: ALL_INTENTS,
	partials: ["CHANNEL", "MESSAGE"],
	botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)]
})

async function start() {
	await importx(__dirname + "/{events,commands}/**/*.{ts,js}")

	if (!process.env.TOKEN)
		return Logger.log("ERROR", "Stopped working because TOKEN didn't exist in *.env* file. The bot is not running.")
	else await client.login(process.env.TOKEN)
}

start().then(() => {
	Logger.log("INFO", "Starting Discord Bot...")
})
