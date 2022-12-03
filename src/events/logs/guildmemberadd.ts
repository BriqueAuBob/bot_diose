import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { GuildMember, GuildTextBasedChannel } from "discord.js";
import createLogMessage from "../../functions/createlogmessage";

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildMemberAdd", {
      description: "Called when a new member is being added on the server",
      once: false,
    });
  }

  execute(member: GuildMember) {
    if (member.guild.id === "977507903307145216") {
      member.roles.add("985505448398577674");
    }
    createLogMessage(this.name, member);

    const channel = member.guild.channels.cache.get(
      "977511559234486352"
    ) as GuildTextBasedChannel;
    if (!channel) return;

    channel.send({
      content: `Hop hop hop! On souhaite tous la bienvenue à ${member} sur le serveur!`,
    });
  }
}
