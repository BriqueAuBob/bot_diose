import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ButtonInteraction } from "discord.js";
import { channels } from "../../../functions/voicechannel";

export class NotifButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["DELETE_VC"]);
  }

  async execute(button: ButtonInteraction) {
    const channelId = channels.get(button.user.id);
    if (!channelId)
      return button.reply({
        content: "Vous n'avez pas de salon vocal !",
        ephemeral: true,
      });
    const channel = button.guild!.channels.cache.get(channelId);
    if (!channel)
      return button.reply({
        content: "Vous n'avez pas de salon vocal !",
        ephemeral: true,
      });
    // @ts-ignore
    if (channel.members.size > 0)
      return button.reply({
        content:
          "Vous ne pouvez pas supprimer un salon vocal avec des membres à l'intérieur !",
        ephemeral: true,
      });
    try {
      await channel.delete();

      button.reply({
        content: "Le salon vocal a été supprimé !",
        ephemeral: true,
      });
    } catch {
      button.reply({
        content: "Une erreur est survenue lors de la suppression du salon !",
        ephemeral: true,
      });
    }
  }
}
