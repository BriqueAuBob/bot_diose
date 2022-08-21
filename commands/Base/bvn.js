const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")



module.exports = {
    help: {
        name: "add"
    },
    data: new SlashCommandBuilder()
        .setName("bvn")
        .setDescription("Embed de bienvenue"),


    async execute(interaction) {
       
        
    }
}