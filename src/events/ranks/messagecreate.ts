import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Message } from "discord.js";
import member from "../../models/member";
import ExperienceEnums from "../../enums/experience";
import getLevel from "../../functions/getlevel";
import { ranks } from "../../config.json";
const cooldown = new Map<string, number>();

export default class extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageCreate", {
      description: "When a message is created.",
      once: false,
    });
  }

  async execute(message: Message) {
    const guildMember = message.member;
    if (!guildMember) return;

    const { guild, author } = message;
    if (!guild || author.bot) return;
    if (cooldown.get(author.id) && cooldown.get(author.id)! > Date.now())
      return;

    const guildMemberDb = await member.findOne({
      userID: author.id,
    });

    if (!guildMemberDb) {
      return await member.create({
        userID: author.id,
        xp: ExperienceEnums.ON_MESSAGE_CREATE,
      });
    }
    const oldLevel = getLevel(guildMemberDb.xp!);

    guildMemberDb.xp! += ExperienceEnums.ON_MESSAGE_CREATE;
    guildMemberDb.save();

    const level = getLevel(guildMemberDb.xp!);
    if (level > oldLevel) {
      // @ts-ignore
      await message.channel.send(
        `Bravo ${guildMember}, tu es passé niveau ${level} ! :tada:`
      );

      const levels = Object.keys(ranks);
      const lvl = levels.find((lvl) => Number(lvl) === level);
      const id: string | undefined =
        /* @ts-ignore */
        ranks[lvl as keyof ranks];
      if (id && !guildMember.roles.cache.has(id)) {
        await guildMember.roles.add(id);
      }
    }

    cooldown.set(author.id, new Date().getTime() + 1000 * 20);
  }
}
