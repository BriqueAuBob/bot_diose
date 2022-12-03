import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ChannelType, Message } from "discord.js";
import createLogMessage from "../../functions/createlogmessage";

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageCreate", {
      description: "Called when a message is created",
      once: false,
    });
  }

  execute(message: Message) {
    if (message.author.bot) return;
    if (message.channel.type !== ChannelType.DM) return;
    createLogMessage("botReceiveDM", message.author, message);
  }
}
