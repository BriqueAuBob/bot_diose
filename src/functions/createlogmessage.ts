import { logs } from "../config.json";
import { WebhookClient, GuildMember, EmbedBuilder } from "discord.js";
import { WebhookConfig, WebhooksConfig } from "../contracts/WebhookConfig";
import format from "./format";

export default function (
  eventName: string,
  member: GuildMember,
  ...args: any[]
) {
  const eventConfig: WebhookConfig | undefined =
    /* @ts-ignore */
    logs.webhooks[eventName as keyof WebhooksConfig];
  if (!eventConfig) return;

  const webhook = new WebhookClient({
    url: logs.webhook_base_uri + eventConfig.id + "/" + eventConfig.token,
  });

  const embed = new EmbedBuilder()
    .setTitle(format(eventConfig.title, member, member.id, ...args))
    .setDescription(format(eventConfig.description, member, member.id, ...args))
    .setColor("DarkButNotBlack")
    .setTimestamp();

  webhook.send({
    embeds: [embed],
  });
}
