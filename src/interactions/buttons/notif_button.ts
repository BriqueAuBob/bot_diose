import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction } from "discord.js";
import { notifs } from "../../config.json";

export class NotifButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["NOTIF_SITE", "NOTIF_MULTID", "NOTIF_META"]);
  }

  async execute(button: ButtonInteraction) {
    const id = button.customId;
    /* @ts-ignore */
    const role_id = notifs[id];

    const member = await button.guild!.members.fetch(button.user.id);
    const role = await button.guild!.roles.fetch(role_id);

    if (member.roles.cache.has(role_id)) {
      await member.roles.remove(role!);
      await button.reply({
        content: `Le rôle ${role} vous a été retiré.`,
        ephemeral: true,
      });
    } else {
      await member.roles.add(role!);
      await button.reply({
        content: `Added ${role} vous a été ajouté.`,
        ephemeral: true,
      });
    }
  }
}
