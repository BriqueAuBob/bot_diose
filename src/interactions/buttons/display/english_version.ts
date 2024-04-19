import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  ButtonInteraction,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
} from "discord.js";

export class EnglishVersion extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["DISPLAY_ENGLISH_VERSION"]);
  }

  async execute(interaction: ButtonInteraction) {
    const forumMakeBetter = this.client.channels.cache.get(
      "1129937161769193472"
    ) as TextChannel;

    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setDescription(
        `# Our group's calling\n
        ## <:Fichier29emotesdiose:1124453982161616976> Inspire and enable your ideas to come to life by harnessing our innovative solutions.
        \n<:Fichier54emotesdiose:1126281513709875200>**All of our support platforms** are designed to give you the tools you need to create the best possible projects. We aim to address various tasks such as management, customization of your identity, improving your performance, and much more.
        \n<:Fichier54emotesdiose:1126281513709875200>**Our solutions are regularly maintained** through the implementation of updates, additions, and innovative features. You can find detailed presentations of these solutions on the following forums:
        ${forumMakeBetter}
        \n<:Fichier54emotesdiose:1126281513709875200>**You can also visit** our dedicated website for the group at https://diose.io/ .
        \n<:Fichier54emotesdiose:1126281513709875200>**Please note that** a Frequently Asked Questions section is available in the channel ⁠faq.
        \n🇬🇧 Lastly, we are dedicated to making Diose as accessible as possible. Translating each of our projects is one of our objectives; however, we cannot guarantee a complete translation of all information in its entirety.
      `
      )
      .setImage(
        "https://media.discordapp.net/attachments/911580109151019028/1127693361155944559/Plan_de_travail_125.png?width=555&height=27"
      )
      .setFooter({
        text: "Diose 2023-2024 | Click below to get more informations !",
      });

    interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });
  }
}
