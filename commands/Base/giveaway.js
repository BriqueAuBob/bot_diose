
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")



module.exports = {
    help: {
        name: "giveaway"
    },
    data: new SlashCommandBuilder()
        .setName("giveaway")
        .setDescription("Faire un giveaway")
        .addStringOption(option => option.setName('durée').setDescription('La durée ex: 2d (2 jour)').setRequired(true))
        .addStringOption(option => option.setName('prix').setDescription('Le prix à gagner').setRequired(true))
        .addStringOption(option => option.setName('gagnants').setDescription('Le nombre de gagnants').setRequired(true))
        .addChannelOption(option => option.setName('salon').setDescription('Salon ou le message va être envoyé')),


    async execute(interaction) {
        const winners = parseInt(interaction.options.getString('gagnants'))
        const channel = interaction.options.getChannel('salon') || interaction.channel
        const duration = interaction.options.getString('durée')
        const prize = interaction.options.getString('prix')
        if ((!duration.endsWith("s") && !duration.endsWith("m") && !duration.endsWith("h") && !duration.endsWith("d")) || isNaN(parseInt(duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1)))) {
            return interaction.reply({ content: "Vous deviez indiquer la durée du giveaway..", ephemeral: true });
        }
        var time;
        if (duration.endsWith("s")) {
            time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 1;
        } else if (duration.endsWith("m")) {
            time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 60;
        } else if (duration.endsWith("h")) {
            time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 3600;
        } else if (duration.endsWith("d")) {
            time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 86400;
        }
        const date = new Date(Date.now()+time*1000)
        const giveawayEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription(`Prix: **${prize}**\nAuteur: ${interaction.member}\nFin: <t:${Math.floor(date.getTime()/1000)}:R>\nGagnants: **${winners}**`)
        const giveaway = await channel.send({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY** 🎉" });
        giveaway.react("🎉")
        


    }
}
