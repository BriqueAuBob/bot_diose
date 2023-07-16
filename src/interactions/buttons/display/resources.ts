import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  ButtonInteraction,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export class EnglishVersion extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["DISPLAY_RESOURCES"]);
  }

  async execute(interaction: ButtonInteraction) {
    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setDescription(
        `## <:Fichier65emotesdiose:1127733448052834454> Ressources | À votre arrivée sur le serveur Discord.\nEn arrivant sur le serveur Diose, vous **choissisez donc les differents projets** qui vous plaisent, vous serez alors mentionnés lors des **diverses annonces** les concernant (le ping dépendra notamment de l'importance du sujet).\n\nLe serveur dispose aussi de **rôles atteignables selons des niveaux d'activités** tels que :\n\n@Rôle - Texte\n@Rôle - Texte\n@Rôle - Texte\n@Rôle - Texte\n@Rôle - Texte\n@Rôle - Texte\n@Rôle - Texte\n\n:Fichier53emotesdiose: Tu peux aussi **constater quel niveau** tu as atteint en exécutant la commande **/rank** dans #commandes.`
      )
      .setImage(
        "https://media.discordapp.net/attachments/911580109151019028/1127693361155944559/Plan_de_travail_125.png?width=555&height=27"
      );

    interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });
  }
}
