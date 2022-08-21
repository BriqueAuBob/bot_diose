const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageAttachment, MessageEmbed, UserFlags, Permissions } = require("discord.js")
const data = require("../../events/exp/data.json")
module.exports = {
    help: {
        name: "say"
    },
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Envoyer un message avec le bot")
        .addStringOption(option => option.setName('message').setDescription('Le message à envoyer').setRequired(true))
        .addChannelOption(option => option.setName('salon').setDescription('Salon ou le message va être envoyé')),
    async execute(interaction) {
        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({content: "Vous ne pouvez pas utiliser cette commande", ephemeral: true})
        const content = interaction.options.getString('message')
        const channel = interaction.options.getChannel('salon') || interaction.channel
        interaction.reply({content: `Votre message à bien été envoyé dans ${channel}`, ephemeral: true})
        channel.send({content: `${content}`})

        
        
    }
}