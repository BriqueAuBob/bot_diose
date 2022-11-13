import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { GuildMember } from "discord.js";
import createLogMessage from "../../functions/createlogmessage";

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildMemberAdd", {
      description: "Called when a new member is being added on the server",
      once: false,
    });
  }

  execute(member: GuildMember) {
    createLogMessage(this.name, member);
  }
}
