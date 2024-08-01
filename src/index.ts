import { ShewenyClient } from "sheweny";
import { Partials } from "discord.js";
import mongoose from "mongoose";

require("dotenv").config();

console.log("Starting bot...");
mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI as string, {
    family: 4,
    maxPoolSize: 10,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    const client = new ShewenyClient({
      intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "MessageContent",
        "GuildMessageReactions",
        "GuildVoiceStates",
        "DirectMessages",
        "DirectMessageReactions",
        "DirectMessageTyping",
      ],
      partials: [
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.Channel,
      ],
      managers: {
        commands: {
          directory: "./commands",
          autoRegisterApplicationCommands: true,
          prefix: "!",
        },
        events: {
          directory: "./events",
        },
        buttons: {
          directory: "./interactions/buttons",
        },
        modals: {
          directory: "./interactions/modals",
        },
      },
      mode: process.env.MODE as "development" | "production", // Change to production for production bot
    });

    client.login(process.env.TOKEN);
  })
  .catch((err: string) => {
    console.log(err);
  });
