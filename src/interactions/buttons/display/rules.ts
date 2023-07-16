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
    super(client, ["DISPLAY_RULES"]);
  }

  async execute(interaction: ButtonInteraction) {
    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setDescription(
        `## <:Fichier57emotesdiose:1127733394596430025> Chez Diose, il est important de respecter les règles de bienséance dans une communauté.\n<:Fichier30emotesdiose:1124453984065818725> **Le respect d'autrui est primordial**, ainsi la bienveillance soutenue par un **français correct** est demandé (à noter que nous sommes ouverts aux communautés internationales).\n\n<:Fichier31emotesdiose:1124453985605124238> Vous êtes en obligation de **respecter les CGU de nos projets**.\n\n<:Fichier32emotesdiose:1124453987203154011> Les Terms of Services & les Guidelines **de Discord** s'appliquent aussi.\n\n<:Fichier33emotesdiose:1124453988742483968> Le respect de la **propriété intellectuelle est primordial**, tout plagiat ou vol peut conduire à une action en justice.\n\n<:Fichier34emotesdiose:1124453990596366397> Toutes formes de racisme, descrimination, harcèlement est **interdite & censurée**.\n\n<:Fichier35emotesdiose:1124453992253116526> Enfin, n'importe **quelle forme de référence à du contenu pornographique** est totalement interdit et sera bannie.`
      )
      .setImage(
        "https://media.discordapp.net/attachments/911580109151019028/1127693361155944559/Plan_de_travail_125.png?width=555&height=27"
      )

    interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });
  }
}
