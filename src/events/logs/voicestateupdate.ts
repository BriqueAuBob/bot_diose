import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { VoiceState } from "discord.js";
import createLogMessage from "../../functions/createlogmessage";

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "voiceStateUpdate", {
      description: "When a user join or leave a voice channel.",
      once: false,
    });
  }

  execute(oldState: VoiceState, newState: VoiceState) {
    const member = oldState.member;
    if (!member) return;
    if (oldState.channelId && !newState.channelId) {
      createLogMessage(
        "voiceChannelLeave",
        member,
        oldState.channel,
        oldState.channel?.name
      );
      if (oldState.channel?.parent?.id !== "1048733213138354206") return;
      if (oldState.channel?.members.size === 0) {
        oldState.channel.delete();
      }
    } else {
      createLogMessage(
        "voiceChannelJoin",
        member,
        newState.channel,
        newState.channel?.name
      );
    }
  }
}
