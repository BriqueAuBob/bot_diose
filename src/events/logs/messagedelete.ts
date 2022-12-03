import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Message } from "discord.js";
import createLogMessage from "../../functions/createlogmessage";

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageDelete", {
      description: "When a message is updated.",
      once: false,
    });
  }

  execute(message: Message) {
    const member = message.member;
    if (!member) return;
    createLogMessage(this.name, member, message.content);
  }
}
