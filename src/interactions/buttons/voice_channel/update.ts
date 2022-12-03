import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} from "discord.js";

export class NotifButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["UPDATE_VC_BUTTON"]);
  }

  async execute(button: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setTitle("Modifier le nom du salon vocal")
      .setCustomId("UPDATE_VC_NAME")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("UPDATE_VC_NAME_INPUT")
            .setLabel("Nouveau nom")
            .setMinLength(1)
            .setMaxLength(40)
            .setStyle(TextInputStyle.Short)
        ) as any
      );

    button.showModal(modal);
  }
}
