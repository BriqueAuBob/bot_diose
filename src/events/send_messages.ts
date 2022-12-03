import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { TextChannel, APIEmbedField, RequestManager } from "discord.js";
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export class ReadyEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
      emitter: client,
    });
  }

  async execute() {
    // if (true) return;
    // const channel = this.client.channels.cache.get(
    //   "989247806193684531"
    // ) as TextChannel;
    // if (!channel) return;
    // const imageEmbedN = new EmbedBuilder()
    //   .setImage(
    //     "https://cdn.discordapp.com/attachments/1041410221039431731/1041410354799968286/Fichier_252x-8.png"
    //   )
    //   .setColor("#2F3136");
    // const embed = new EmbedBuilder()
    //   .setAuthor({
    //     name: "Notifications",
    //     iconURL:
    //       "https://cdn3d.iconscout.com/3d/premium/thumb/notification-3994308-3307642.png",
    //   })
    //   .setDescription(
    //     "Choisissez quels types d'actutalités vous souhaitez suivre !"
    //   )
    //   .addFields([
    //     {
    //       inline: true,
    //       name: "Nouveautés du site",
    //       value: "<:um_logo2:979107826578370680>",
    //     },
    //     {
    //       inline: true,
    //       name: "Actualités de Meta Creation",
    //       value: "<:LogoMC:1035315065118802000>",
    //     },
    //   ])
    //   .setColor("#2f3136")
    //   .setImage(
    //     "https://cdn.discordapp.com/attachments/1003699610742693918/1021143512022012015/unknown.png"
    //   );
    // const row = new ActionRowBuilder().addComponents(
    //   new ButtonBuilder()
    //     .setCustomId("NOTIF_SITE")
    //     .setLabel("Site")
    //     .setStyle(ButtonStyle.Secondary)
    //     .setEmoji("<:um_logo2:979107826578370680>"),
    //   new ButtonBuilder()
    //     .setCustomId("NOTIF_META")
    //     .setLabel("Meta Creation")
    //     .setStyle(ButtonStyle.Secondary)
    //     .setEmoji("<:LogoMC:1035315065118802000>")
    // );
    // channel.send({
    //   embeds: [imageEmbedN, embed],
    //   components: [row as any],
    // });
    // const imageEmbed = new EmbedBuilder()
    //   .setColor("#2f3136")
    //   .setImage(
    //     "https://cdn.discordapp.com/attachments/1041410221039431731/1041410353512325244/Fichier_202x-8.png"
    //   );
    // const embedSupport = new EmbedBuilder()
    //   .setAuthor({
    //     name: "Contacter le staff",
    //     iconURL:
    //       "https://cdn.discordapp.com/emojis/969923409247080498.webp?size=96&quality=lossless",
    //   })
    //   .setDescription(
    //     "Pour toute demande concernant un **partenariat**, un **renseignement** ou pour une **plainte** veuillez ouvrir un ticket ci-dessous."
    //   )
    //   .setColor("#2f3136")
    //   .setImage(
    //     "https://cdn.discordapp.com/attachments/1003699610742693918/1021143512022012015/unknown.png"
    //   );
    // const rowSupport = new ActionRowBuilder().addComponents(
    //   new ButtonBuilder()
    //     .setCustomId("SUPPORT_MODAL")
    //     .setLabel("Contacter le staff")
    //     .setStyle(ButtonStyle.Primary)
    //     .setEmoji("📩")
    // );
    // const channel2 = this.client.channels.cache.get(
    //   "977508374373630023"
    // ) as TextChannel;
    // channel2.send({
    //   embeds: [imageEmbed, embedSupport],
    //   components: [rowSupport as any],
    // });
    // const embed2 = new EmbedBuilder()
    //   .setAuthor({
    //     name: "Créer un salon vocal",
    //   })
    //   .setDescription(
    //     "Pour créer un salon vocal, veuillez cliquer sur le bouton ci-dessous."
    //   )
    //   .setColor("#2f3136")
    //   .setImage(
    //     "https://cdn.discordapp.com/attachments/1003699610742693918/1021143512022012015/unknown.png"
    //   );
    // const row2 = new ActionRowBuilder().addComponents(
    //   new ButtonBuilder()
    //     .setCustomId("CREATE_VC_PUBLIC")
    //     .setLabel("Créer un salon vocal")
    //     .setStyle(ButtonStyle.Primary)
    //     .setEmoji("🎤")
    // );
    // const channel3 = this.client.channels.cache.get(
    //   "1048733266926121071"
    // ) as TextChannel;
    // channel3.send({
    //   embeds: [embed2],
    //   components: [row2 as any],
    // });
  }
}
