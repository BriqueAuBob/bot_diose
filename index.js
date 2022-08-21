require("dotenv").config()
const { Client, Intents, Collection } = require("discord.js")
const client = new Client({ intents: [Object.keys(Intents.FLAGS)], partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER"] })
const { LoadCommands, LoadEvents } = require("./util/loader");


client.commands = new Collection()

LoadCommands(client)
LoadEvents(client)

client.login(process.env.TOKEN)
