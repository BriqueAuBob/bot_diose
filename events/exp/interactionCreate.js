const { MessageAttachment, MessageEmbed, UserFlags, MessageActionRow, MessageButton } = require("discord.js")
const data = require("./data.json")
module.exports = async (client, interaction) => {
    if(!interaction.isButton()) return
    const array = []
    data.forEach((d) => array.push(d))
    array.sort((a, b) => {
        if(a.level === b.level) {
            return b.exp - a.exp
        } else {
            return b.level - a.level
        }
    })
    if(interaction.customId.startsWith("arrowleft")) {
        const id = interaction.customId.split("_")
        const min = parseInt(id[1])-10
        const max = parseInt(id[2])-10
        const row = new MessageActionRow()
        if(min === 0) {
            row.addComponents(
                new MessageButton()
            .setLabel("◀")
            .setCustomId(`arrowleft_${min}_${max}`)
            .setDisabled(true)
            .setStyle("SECONDARY")
            )
        } else {
            row.addComponents(
            new MessageButton()
            .setLabel("◀")
            .setCustomId(`arrowleft_${min}_${max}`)
            .setStyle("SECONDARY"))
        }
        row.addComponents(
            new MessageButton()
            .setLabel("▶")
            .setCustomId(`arrowright_${min}_${max}`)
            .setStyle("SECONDARY")
        )
        const embed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setTitle("Classement des membres")
        .setDescription(`${array.splice(min, 10).map((x, i) => `**#${i+1+min}** | ${interaction.guild.members.cache.find(m => m.id === x.userId)} | Level: **${x.level}** Exp: **${x.exp}**`).join("\n")}`)
        interaction.update({embeds: [embed], components: [row]})
      
    } else if(interaction.customId.startsWith("arrowright")) {
        const id = interaction.customId.split("_")
        const min = parseInt(id[1])+10
        const max = parseInt(id[2])+10
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("◀")
            .setCustomId(`arrowleft_${min}_${max}`)
            .setStyle("SECONDARY")
        )
        if(max+10 > array.length-1) {
            row.addComponents(
                new MessageButton()
            .setLabel("▶")
            .setCustomId(`arrowright_${min}_${max}`)
            .setStyle("SECONDARY")
            .setDisabled(true)
            )
        } else {
            row.addComponents(
                new MessageButton()
            .setLabel("▶")
            .setCustomId(`arrowright_${min}_${max}`)
            .setStyle("SECONDARY")
            )
        }
        
        const embed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setTitle("Classement des membres")
        .setDescription(`${array.splice(min, 10).map((x, i) => `**#${i+1+min}** | ${interaction.guild.members.cache.find(m => m.id === x.userId)} | Level: **${x.level}** Exp: **${x.exp}**`).join("\n")}`)
        interaction.update({embeds: [embed], components: [row]})
    }
}