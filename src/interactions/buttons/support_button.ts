import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ButtonInteraction, ModalBuilder, TextInputStyle } from "discord.js";
import { ActionRowBuilder, TextInputBuilder } from "discord.js";

export class NotifButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["SUPPORT_MODAL"]);
  }

  async execute(button: ButtonInteraction) {
    const row = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("CONTACT_REASON")
        .setLabel("Reason")
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(10)
        .setMaxLength(3000)
        .setRequired(true)
    );
    const modal = new ModalBuilder()
      .setTitle("Contact")
      .setCustomId("CONTACT_MODAL")
      .addComponents(row as any);

    button.showModal(modal);
  }
}
