import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelType,
} from "discord.js";
import type { CategoryChannel } from "discord.js";
import { channels } from "../../../functions/voicechannel";

export class NotifButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["CREATE_VC_PUBLIC"]);
  }

  async execute(button: ButtonInteraction) {
    const category = (await button.guild!.channels.cache.get(
      "1048733213138354206"
    )) as CategoryChannel | null;
    if (!category) return;

    if (channels.has(button.user.id)) {
      return button.reply({
        content: "Vous avez déjà un salon vocal !",
        ephemeral: true,
      });
    }

    const channel = await button.guild!.channels.create({
      name: "Salon de " + button.user.username,
      type: ChannelType.GuildVoice,
      parent: category,
    });

    channels.set(button.user.id, channel.id);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Rejoindre le salon")
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://discord.com/channels/${button.guild!.id}/${channel.id}`
        ),
      new ButtonBuilder()
        .setCustomId("UPDATE_VC_BUTTON")
        .setLabel("Modifier le nom")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("DELETE_VC")
        .setLabel("Supprimer")
        .setStyle(ButtonStyle.Danger)
    );

    button.reply({
      content: `Le salon ${channel} a été créé ! Rejoignez-le pour commencer à parler ! Si personne ne le rejoins, il sera supprimé <t:${
        Math.floor(Date.now() / 1000) + 60
      }:R> \n Si vous souhaitez le supprimer, cliquez sur le bouton "Supprimer"`,
      components: [row as any],
      ephemeral: true,
    });

    setTimeout(() => {
      if (!channel) return;
      if (!channel.members.size || channel.members.size === 0) {
        channels.delete(button.user.id);
        channel.delete();
      }
    }, 1000 * 60);
  }
}
