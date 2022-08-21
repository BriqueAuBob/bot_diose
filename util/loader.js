const { readdirSync, writeFile } = require("fs");
const slashCommands = [];
const commandFolder = "commands"
const LoadCommands = (client) => {
    const commands = readdirSync(`./${commandFolder}/`)
    commands.forEach(folder => {
        const files = readdirSync(`./${commandFolder}/${folder}/`).filter(files => files.endsWith(".js"))
        for (const file of files) {
            const command = require(`../commands/${folder}/${file}`)
            slashCommands.push(command.data.toJSON())
            client.commands.set(command.data.name, command)
        }
    })
}
const LoadEvents = (client, dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0]
            client.on(evtName, evt.bind(null, client));
        }
    })
}

module.exports = {
    LoadCommands,
    LoadEvents,
    slashCommands
}