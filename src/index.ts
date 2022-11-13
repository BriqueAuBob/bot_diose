import { ShewenyClient } from "sheweny";
import { Partials } from "discord.js";

require("dotenv").config();

const client = new ShewenyClient({
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "MessageContent",
    "GuildMessageReactions",
    "GuildVoiceStates",
  ],
  partials: [Partials.GuildMember, Partials.Message],
  presence: {
    status: "online",
    activities: [
      {
        name: 'Use "help" command',
      },
    ],
  },
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
    selectMenus: {
      directory: "./interactions/selectmenus",
    },
    modals: {
      directory: "./interactions/modals",
    },
    inhibitors: {
      directory: "./inhibitors",
    },
  },
  mode: process.env.MODE as "development" | "production", // Change to production for production bot
});

client.login(process.env.TOKEN);
