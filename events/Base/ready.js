require("dotenv").config()
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { Client, Intents, Collection } = require("discord.js")
const { slashCommands } = require("../../util/loader")
module.exports = async (client) => {

    const rest = new REST({
        version: "9"
    }).setToken(process.env.TOKEN);

    (async () => {
        try {
            
                await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                    body: slashCommands
                })
                console.log(`Les commandes sont prêtes à être utilisées`)

        } catch(err) {
            if(err) console.error(err)
        }
    })()
    client.channels.cache.get("979097878540726303").send({content: "test"})
}
