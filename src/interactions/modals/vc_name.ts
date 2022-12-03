import { Modal } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ComponentType, ModalSubmitInteraction } from "discord.js";
import { channels } from "../../functions/voicechannel";

export default class extends Modal {
  constructor(client: ShewenyClient) {
    super(client, ["UPDATE_VC_NAME"]);
  }

  async execute(modal: ModalSubmitInteraction) {
    const name = modal.fields.getField(
      "UPDATE_VC_NAME_INPUT",
      ComponentType.TextInput
    ).value;
    const channelId = channels.get(modal.user.id);
    if (!channelId)
      return modal.reply({
        content: "Vous n'avez pas de salon vocal !",
        ephemeral: true,
      });

    const channel = modal.guild!.channels.cache.get(channelId);
    if (!channel)
      return modal.reply({
        content: "Vous n'avez pas de salon vocal !",
        ephemeral: true,
      });

    await channel.setName(name);
    modal.reply({
      content: "Le nom du salon a été modifié !",
      ephemeral: true,
    });
  }
}
