import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Channel, ChannelType } from "discord.js";
import { channels } from "../functions/voicechannel";

export class VCDeleteEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "channelDelete", {
      description: "When a channel is deleted",
      once: false,
    });
  }

  async execute(channel: Channel) {
    if (channel.type !== ChannelType.GuildVoice) return;
    const entries = [...channels.entries()];
    const entry = entries.find(([, id]) => id === channel.id);
    if (!entry) return;
    channels.delete(entry[0]);
  }
}
