import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import memberDb from "../../models/member";
import getLevel from "../../functions/getlevel";

export default class extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "leaderboard",
      description: "Vois la liste des membres les plus actifs",
      type: "SLASH_COMMAND",
      category: "Fun",
    });
  }

  async execute(interaction: CommandInteraction) {
    const members = await memberDb.find({}).sort({ xp: -1 }).limit(10);
    const currentUser = await memberDb.findOne({ id: interaction.user.id });
    const beforeCurrentUser =
      (await memberDb.find({ xp: { $gt: currentUser?.xp || 0 } }).count()) + 1;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: "Top 10 des membres les plus actifs",
      })
      .setColor("#2F3136")
      .setDescription(
        members
          .map((member, index) => {
            switch (index) {
              case 0:
                return `🥇 - <@${member.userID}> ~ *Niveau ${getLevel(
                  member.xp!
                )}*`;
              case 1:
                return `🥈 - <@${member.userID}> ~ *Niveau ${getLevel(
                  member.xp!
                )}*`;
              case 2:
                return `🥉 - <@${member.userID}> ~ *Niveau ${getLevel(
                  member.xp!
                )}*`;
              default:
                return `${index + 1} - <@${member.userID}> ~ *Niveau ${getLevel(
                  member.xp!
                )}*`;
            }
          })
          .slice(0, 10)
          .join("\n") +
          `\n\n**Votre position:**\n${beforeCurrentUser} - ${
            interaction.member
          } ~ Niveau ${getLevel(
            currentUser?.xp || 0
          )} \n*Vous n'êtes pas dans le top 10 ? Parlez plus !*`
      )
      .setImage("https://i.imgur.com/kdJejsd.png");

    await interaction.reply({ embeds: [embed] });
  }
}
