const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageAttachment, MessageEmbed, UserFlags, MessageActionRow, MessageButton } = require("discord.js")
const {registerFont, createCanvas, loadImage} = require("canvas")
const data = require("../../events/exp/data.json")
module.exports = {
    help: {
        name: "top"
    },
    data: new SlashCommandBuilder()
        .setName("top")
        .setDescription("Voir le top"),
    async execute(interaction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("◀")
            .setCustomId("arrowleft_0_10")
            .setDisabled(true)
            .setStyle("SECONDARY")
        )
        .addComponents(
            new MessageButton()
            .setLabel("▶")
            .setCustomId("arrowright_0_10")
            .setStyle("SECONDARY")
        )
        const array = []
        data.forEach((d) => array.push(d))
        array.sort((a, b) => {
            if(a.level === b.level) {
                return b.exp - a.exp
            } else {
                return b.level - a.level
            }
        })
    
        const embed =  new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setTitle("Classement des membres")
        .setDescription(`${array.splice(0, 10).map((x, i) => `**#${i+1}** | ${interaction.guild.members.cache.find(m => m.id === x.userId)} | Level: **${x.level}** Exp: **${x.exp}**`).join("\n")}`)
        interaction.reply({embeds: [embed], components: [row]})
        setTimeout(() => {
            interaction.editReply({embeds: [embed], components: []})
        }, 30*1000)
    }
}
const date = new Date('July 16, 2022 14:30:00')
if(date.getTime() > Date.now()) return