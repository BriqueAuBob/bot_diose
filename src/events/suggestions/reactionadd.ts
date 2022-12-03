import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { messageLink, MessageReaction, User } from "discord.js";

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageReactionAdd", {
      description: "When a reaction is added to a suggestion.",
      once: false,
    });
  }

  async execute(reaction: MessageReaction, user: User) {
    if (user.bot) return;
    if (reaction.message.channel.id !== "995334104725864578") return;

    if (reaction.message.partial) {
      await reaction.message.fetch();
    }
    switch (reaction.emoji.name) {
      case "✅":
        reaction.message.reactions.cache.get("❌")?.users.remove(user.id);
        break;
      case "❌":
        reaction.message.reactions.cache.get("✅")?.users.remove(user.id);
        break;
    }
  }
}
