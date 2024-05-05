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
    if (cooldown.get(author.id) && cooldown.get(author.id)! > Date.now()) return;

    const guildMemberDb = await member.findOne({
      userID: author.id,
    });

    if (!guildMemberDb) {
      await member.create({
        userID: author.id,
        xp: ExperienceEnums.ON_MESSAGE_CREATE,
      });
      return;
    }

    const oldLevel = getLevel(guildMemberDb.xp!);

    guildMemberDb.xp! += ExperienceEnums.ON_MESSAGE_CREATE;
    await guildMemberDb.save();

    const level = getLevel(guildMemberDb.xp!);
    if (level > oldLevel) {

      const roleId: string | undefined = ranks[level as unknown as keyof typeof ranks];
      if (roleId && !guildMember.roles.cache.has(roleId)) {
        await guildMember.roles.add(roleId);


        const role = guild.roles.cache.get(roleId);
        if (role) {
          await message.channel.send(
            `Bravo ${guildMember}, tu es passé niveau ${level} et tu obtiens le rôle **${role.name}** ! :tada:`
          );
        }
      } else {
        await message.channel.send(
            `Bravo ${guildMember}, tu es passé niveau ${level} ! :tada:`
          );
      }
    }

    cooldown.set(author.id, new Date().getTime() + 1000 * 20);
  }
}
