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
    super(client, ["DISPLAY_LINKS"]);
  }

  async execute(interaction: ButtonInteraction) {
    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setDescription(
        `## <:Fichier71emotesdiose:1127733456735060018> Diose est partout !\nRetrouvez un **ensemble de lien qui vous mèneront à** Diose à travers plusieurs plateformes.\n\n<:Fichier53emotesdiose:1126844984700710942> **Liens concernant nos réseaux :**\n<:Fichier42emotesdiose:1124455144478736495> https://diose.io\n<:Fichier45emotesdiose:1124461730131624019> https://diose.io/discord\n<:Fichier47emotesdiose:1124461733617086564> https://twitter.com/groupdiose\n<:Fichier46emotesdiose:1124461731222130709> https://youtu.be/groupdiose\n<:Fichier53emotesdiose:1126844984700710942> **Liens concernant nos politiques :**\n<:Fichier63emotesdiose:1127733444097622086>https://diose.io/guidelines\n<:Fichier64emotesdiose:1127733445624332378>https://diose.io/privacy-policy`
      )
      .setImage(
        "https://media.discordapp.net/attachments/911580109151019028/1127693361155944559/Plan_de_travail_125.png?width=555&height=27"
      )
      .setFooter({
        text: "à vos claviers :)",
        iconURL:
          "https://cdn.discordapp.com/emojis/965190483242532940.gif?size=160&quality=lossless",
      });

    interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });
  }
}
