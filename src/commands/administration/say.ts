import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import {
  ApplicationCommandOptionType,
  BaseGuildTextChannel,
  GuildBasedChannel,
} from "discord.js";

export default class extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "say",
      description: "Envoie un message avec le bot",
      type: "SLASH_COMMAND",
      category: "Administration",
      userPermissions: ["Administrator"],
      options: [
        {
          name: "message",
          description: "Le message à envoyer",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "channel",
          description: "Le channel où envoyer le message",
          type: ApplicationCommandOptionType.Channel,
          required: false,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const message = (await interaction.options.get("message", true)
      ?.value) as string;
    const channel =
      ((await interaction.options.get("channel")
        ?.channel) as GuildBasedChannel) || interaction.channel;

    if (!channel || !(channel instanceof BaseGuildTextChannel)) {
      return interaction.reply({
        content: "Ce n'est pas un channel valide",
        ephemeral: true,
      });
    }

    channel.send(message);
    interaction.reply({
      ephemeral: true,
      content: "Le message a bien été envoyé.",
    });
  }
}
