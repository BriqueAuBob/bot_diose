import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ActivityType, GuildMember } from "discord.js";
import createLogMessage from "../../functions/createlogmessage";

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildMemberRemove", {
      description: "Called when a new member is being removed from the server",
      once: false,
    });
  }

  async execute(member: GuildMember) {
    createLogMessage(this.name, member);
    try {
      const guild = await this.client.guilds.fetch("1041358976513753098");
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
