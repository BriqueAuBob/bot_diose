const { Modal, TextInputComponent, MessageActionRow, MessageEmbed } = require("discord.js")

module.exports = async (client, interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId.startsWith("NOTIF")) {
            const site = interaction.guild.roles.cache.get("996965834952032356")
            const multid = interaction.guild.roles.cache.get("996965922558443613")
            const union = interaction.guild.roles.cache.get("996966022349332562")
            if (interaction.customId === "NOTIF_SITE") {
                if (interaction.member.roles.cache.has(site.id)) {
                    await interaction.member.roles.remove(site.id)
                    await interaction.reply({ content: `Le rôle ${site} vous à été retiré avec succès`, ephemeral: true })
                } else {
                    await interaction.member.roles.add(site.id)
                    await interaction.reply({ content: `Le rôle ${site} vous à été ajouté avec succès`, ephemeral: true })
                }
            } else if (interaction.customId === "NOTIF_MULTID") {
                if (interaction.member.roles.cache.has(multid.id)) {
                    await interaction.member.roles.remove(multid.id)
                    await interaction.reply({ content: `Le rôle ${multid} vous à été retiré avec succès`, ephemeral: true })
                } else {
                    await interaction.member.roles.add(multid.id)
                    await interaction.reply({ content: `Le rôle ${multid} vous à été ajouté avec succès`, ephemeral: true })
                }
            } else if (interaction.customId === "NOTIF_UNIONTEAM") {
                if (interaction.member.roles.cache.has(union.id)) {
                    await interaction.member.roles.remove(union.id)
                    await interaction.reply({ content: `Le rôle ${union} vous à été retiré avec succès`, ephemeral: true })
                } else {
                    await interaction.member.roles.add(union.id)
                    await interaction.reply({ content: `Le rôle ${union} vous à été ajouté avec succès`, ephemeral: true })
                }
            }
        } else if (interaction.customId.startsWith("NOUS_CONTACTER")) {
            const row = new MessageActionRow()
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('modal')
                        .setLabel("Formuler votre demande")
                        .setStyle('SHORT')
                        .setRequired(true)
                )
            const modal = new Modal()
                .setCustomId('NOUS_CONTACTER')
                .setTitle('Contacter UMaestro')
                .addComponents(row)

            interaction.showModal(modal)
        } else if(interaction.customId === "delete" && interaction.message.author.id === client.user.id) {
            const message = await interaction.channel.messages.fetch(interaction.message.id)
            await message.delete()
            await interaction.reply({content: "Message supprimé.", ephemeral: true})
        }
    }
}