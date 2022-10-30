require("dotenv").config()
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { slashCommands } = require("../../functions/loader")
module.exports = async (client) => {
    const rest = new REST({
        version: "9"
    }).setToken(process.env.TOKEN);

    (async () => {
        try {

            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                body: slashCommands
            })
            console.log(`(/) commands are operational`)

        } catch (err) {
            if (err) console.error(err)
        }
    })()

}
