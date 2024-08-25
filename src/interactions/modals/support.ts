import { Modal } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  CategoryChannel,
  ChannelType,
  ComponentType,
  EmbedBuilder,
  TextChannel,
  ModalSubmitInteraction,
} from "discord.js";

export default class extends Modal {
  constructor(client: ShewenyClient) {
    super(client, ["CONTACT_MODAL"]);
  }

  async execute(modal: ModalSubmitInteraction) {
    const reason = modal.fields.getField(
      "CONTACT_REASON",
      ComponentType.TextInput
    ).value;

    const embed = new EmbedBuilder()
      .setTitle("Contact")
      .setDescription(reason)
      .setAuthor({
        name: modal.user.tag,
        iconURL: modal.user.displayAvatarURL({ extension: "png", size: 512 }),
      });

    const category = this.client.channels.cache.get(
      "995334104725864578"
    ) as CategoryChannel;

    if (!category) return;

    const hasTicket = modal.guild?.channels.cache.find(
      (channel) =>
        channel.name ===
        `ticket-${modal.user.username.toLowerCase().replaceAll(" ", "-")}`
    ) as TextChannel;

    if (hasTicket) {
      hasTicket.send({ embeds: [embed] });
      modal.reply({
        content: `Vous aviez déjà un ticket d'ouvert, le message a donc été envoyé dans ${hasTicket}!`,
        ephemeral: true,
      });
      return;
    }

    const channel = await modal.guild!.channels.create({
      name: `ticket-${modal.user.username}`,
      type: ChannelType.GuildText,
      parent: category,
      permissionOverwrites: [
        {
          id: modal.user.id,
          allow: ["ViewChannel", "SendMessages"],
        },
        {
          id: "1264233245965418496",
          allow: ["ViewChannel", "SendMessages"],
        },
        {
          id: "985504171501436978",
          allow: ["ViewChannel", "SendMessages"],
        },
        {
          id: "1273615964776300578",
          allow: ["ViewChannel", "SendMessages"],
        },
        {
          id: modal.guild!.id,
          deny: ["ViewChannel"],
        },
      ],
    });

    channel.send({ content: "<@&979104507814367253>", embeds: [embed] });

    modal.reply({
      content: `Votre ticket ${channel} a bien été créé.`,
      ephemeral: true,
    });
  }
}
