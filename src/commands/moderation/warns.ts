import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import members from "../../models/member";

export default class extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "warns",
      description: "Voir les avertissements d'un membre",
      type: "SLASH_COMMAND",
      category: "Moderation",
      userPermissions: ["ManageMessages"],
      options: [
        {
          name: "member",
          description: "Le membre",
          type: ApplicationCommandOptionType.User,
          required: true,
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

    const memberDb = await members.findOne({
      userID: member.id,
    });
    if (!memberDb)
      return interaction.reply({
        content: "Membre introuvable",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle(`Avertissements de ${member.tag}`)
      .setColor("#2F3136");

    if (memberDb.warns?.length === 0) {
      embed.setDescription("Ce membre n'a aucun avertissement");
    } else {
      embed.setDescription(
        `Cet utilisateur a ${memberDb.warns.length} avertissement(s)`
      );
      memberDb.warns?.forEach((warn, index) => {
        embed.addFields({
          name: `Avertissement n°${index + 1}`,
          value: `**Raison:** ${warn.reason}\n**Auteur:** <@${warn.authorID}>`,
        });
      });
    }

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }
}
