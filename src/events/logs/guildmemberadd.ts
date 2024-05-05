import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ActivityType, GuildMember, TextChannel, EmbedBuilder } from "discord.js";
import createLogMessage from "../../functions/createlogmessage";

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildMemberAdd", {
      description: "Called when a new member is being added on the server",
      once: false,
    });
  }

  async execute(member: GuildMember) {
    if (member.guild.id === "977507903307145216") {
      member.roles.add("985505448398577674");
    }
    createLogMessage(this.name, member);

    const channel = member.guild.channels.cache.get(
      "977511559234486352"
    ) as TextChannel;
    if (!channel) return;

    const embed = new EmbedBuilder()
    .setAuthor({ name: 'Atterissage réussit sur Diose !', iconURL: 'https://cdn.discordapp.com/emojis/1133860692127141919.webp?size=96&quality=lossless' })
    .setThumbnail(member.avatarURL({ size: 1024, extension: 'png' }))
    .setImage('https://media.discordapp.net/attachments/1041410221039431731/1226658719136481412/Frame_498Welcome_Diose.png?ex=6638afb4&is=66375e34&hm=444ca05af58f5b2fe8959735b2f8ee3f4676461e60b6ec55cccd97082d471675&format=webp&quality=lossless&')
    .setDescription(`**Bienvenue ${member.user.globalName}** sur la communauté de nos différents projets <:house:1133882723686166618>\n\nDécouvre **l'histoire** de Diose avec les channels https://discord.com/channels/977507903307145216/1129936526306967644 https://discord.com/channels/977507903307145216/1129941578656526387`)
    channel.send({
      content: `<:arobase:1133860690218721361> ${member}`, embeds: [embed]
    });

    try {
      const guild = await this.client.guilds.fetch("977507903307145216");
      this.client.user?.setActivity(
        (await guild.members.fetch()).size + " membres",
        {
          type: ActivityType.Watching,
        }
      );
    } catch {
      console.log("Error while fetching guild");
    }
  }
}
