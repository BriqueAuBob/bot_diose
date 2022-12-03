import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";
import members from "../../models/member";

export default class extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "warn",
      description: "Averti un membre",
      type: "SLASH_COMMAND",
      category: "Moderation",
      userPermissions: ["ManageMessages"],
      options: [
        {
          name: "member",
          description: "Le membre à avertir",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "La raison de l'avertissement",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const member = await interaction.options.get("member", true)?.user;
    if (!member)
      return interaction.reply({
        content: "Membre introuvable",
        ephemeral: true,
      });
    const reason: string =
      ((await interaction.options.get("reason")?.value) as string) ||
      "Pas de raison...";

    const memberDb = await members.findOne({
      userID: member.id,
    });
    if (!memberDb)
      return interaction.reply({
        content: "Membre introuvable",
        ephemeral: true,
      });

    memberDb.warns ||= [];
    memberDb.warns.push({
      authorID: interaction.user.id,
      reason,
    });
    await memberDb.save();

    await interaction.reply({
      content: `Le membre ${member} a été averti pour la raison suivante: ${reason}`,
    });
  }
}
