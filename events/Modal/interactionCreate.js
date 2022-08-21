const { Modal, TextInputComponent, MessageActionRow, MessageEmbed, Permissions } = require("discord.js")

module.exports = async (client, interaction) => {
    if(!interaction.isModalSubmit()) return
    const input = interaction.fields.getTextInputValue('modal')
    const embed = new MessageEmbed()
    .setColor("WHITE")
    .setAuthor({iconURL: interaction.user.displayAvatarURL({size: 1024, format: 'png', dynamic: true}), name: `${interaction.user.tag}`})
    .setTitle("Contenu de la demande")
    .setDescription(`${input}`)
    const ticket = interaction.guild.channels.cache.find(ch => ch.name === `ticket-${interaction.user.username.toLowerCase()}`)
    if(ticket) return interaction.reply({content: `Vous avez déjà votre ticket: ${ticket}`, ephemeral: true})
    const channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        type: 'GUILD_TEXT',
        permissionOverwrites: [
           {
             id: interaction.member.id,
             allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.ATTACH_FILES],
          },{
            id: interaction.guild.id,
            deny: [Permissions.FLAGS.VIEW_CHANNEL]
          }, {
            id: "985504171501436978",
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.ATTACH_FILES]
          }
        ],
      })
      await channel.send({embeds: [embed], content: "<@&979104507814367253> <@&985504171501436978>"})
      await interaction.reply({content: `Ticket créé: ${channel}`, ephemeral: true})
      channel.setParent("995334104725864578", { lockPermissions: false }).catch(console.error)
}