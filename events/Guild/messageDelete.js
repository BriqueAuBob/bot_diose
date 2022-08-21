const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = async (client, message) => {
    if(message.author.bot) return
    if(message.guild.id !== "977507903307145216") return
    var messageContent = message.content
    if(messageContent === "") messageContent = "Aucun message"
    const embed = new MessageEmbed()
    .setColor("WHITE")
    .setTitle("Message supprimé.")
    .setDescription(`Salon: ${message.channel}\nAuteur: ${message.member} `+" (`"+message.member.id+"`)"+`\nContenu: ${messageContent}\nDate: <t:${Math.floor(Date.now()/1000)}:R>`)
   
    const array = []
    const embeds = [embed]
    message.attachments.forEach((attachment) => {
        array.push(attachment)
    })
    if(array.length > 0) {
        array.forEach((element) => {
            const i = array.indexOf(array.find(e => e.id === element.id))
            const myEmbed = new MessageEmbed()
            .setTitle(`Image ${i+1}`)
            .setColor("WHITE")
            try {
                myEmbed.setImage(element.url)
            } catch (e) {
                console.log(e)
            }
            embeds.push(myEmbed)
        })
    }
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle("DANGER")
        .setCustomId("delete")
        .setLabel("Supprimer")
    )
    client.channels.cache.get("985497886898921492").send({embeds: embeds, components: [row]})

}