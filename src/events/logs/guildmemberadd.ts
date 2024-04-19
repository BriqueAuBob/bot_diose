import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ActivityType, GuildMember, TextChannel } from "discord.js";
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

    channel.send({
      content: `Hop hop hop! On souhaite tous la bienvenue à ${member} sur le serveur!`,
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
