import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
    ActionRowBuilder, 
    Guild, 
    APIEmbed,
    EmbedBuilder,
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder,
    ChatInputCommandInteraction,
    ApplicationCommandOptionType,
    BaseGuildTextChannel,
    GuildBasedChannel,
} from "discord.js";

export default class extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "menu",
            description: "Change le message du support",
            type: "SLASH_COMMAND",
            category: "Administration",
            userPermissions: ["Administrator"],
            options: [
                {
                    name: "channel",
                    description: "Le channel où le menu doit être envoyé (sinon il modifie l'existant).",
                    type: ApplicationCommandOptionType.Channel,
                    required: false,
                }
            ]
        });
    }

    async execute(interaction: ChatInputCommandInteraction) {

        const channel = interaction.options.getChannel('channel') as BaseGuildTextChannel;

        var g = interaction.client.guilds.cache.get('1099786599694336091') as Guild;
        var ch = g.channels.cache.get('1099786599694336091') as BaseGuildTextChannel;
        const msg = await ch.messages.fetch('1228085365114667070');
        const oldEmbed: APIEmbed = msg.embeds[0].toJSON();

        g = interaction.client.guilds.cache.get('977507903307145216') as Guild;
        ch = g.channels.cache.get('977508374373630023') as BaseGuildTextChannel;
        const message = await ch.messages.fetch('1048733884285730918');
        const customId = message.components[0].components[0]?.customId ?? 'support_menu';

        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(customId)
                    .setPlaceholder('Ma demande concerne..')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Plaintes')
                            .setDescription('\u200B')
                            .setValue('01'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Partenariats')
                            .setDescription('\u200B')
                            .setValue('02'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Recrutement')
                            .setDescription('\u200B')
                            .setValue('03'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Autre chose')
                            .setDescription('\u200B')
                            .setValue('04')
                    )
            )
        const embed = new EmbedBuilder(oldEmbed)
            .setDescription("Pour contacter notre équipe, il vous suffit d'appuyer sur le **menu situé en dessous de ce message**. Choisi le motif de ta demande.")
            .setFooter({ text: 'Diose Group 2024' })

        if (channel) {
            await message.delete()
            await channel.send({ embeds: [embed], components: [row] })
        } else message.edit({ embeds: [embed], components: [row] })

        interaction.reply({
            ephemeral: true,
            content: "Le message a bien été édité"
        })
    }
}