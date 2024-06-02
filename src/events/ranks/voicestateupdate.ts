import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { VoiceState } from "discord.js";
import member from "../../models/member";
import ExperienceEnums from "../../enums/experience";
import getLevel from "../../functions/getlevel";
import { ranks } from "../../config.json";

export default class extends Event {
    constructor(client: ShewenyClient) {
        super(client, "voiceStateUpdate", {
            description: "When a member is in a VC.",
            once: false,
        });
    }

    async execute(oldState: VoiceState, newState: VoiceState) {

        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const guildMember = (newState.member ?? oldState.member)!;

        const guild = await newState.guild.fetch();
        const guildIds = ['977507903307145216'];
        let timeInterval = 60 * 1000;
        let interval: NodeJS.Timeout | undefined;
        if (!guildIds.some(id => id === guild.id)) return;

        if ((!oldChannel && newChannel) || (oldChannel && newChannel)) {
    
            interval = setInterval(async () => {
                if (newState.selfDeaf || newState.selfMute) return;
                const guildMemberDb = await member.findOne({
                    userID: guildMember.id,
                });
                if (!guildMemberDb) {
                    await member.create({
                        userID: guildMember.id,
                        xp: ExperienceEnums.ON_MESSAGE_CREATE,
                    });
                    return;
                }
                const oldLevel = getLevel(guildMemberDb.xp!);

                guildMemberDb.xp! += ExperienceEnums.ON_VOICE_STATE_UPDATE;
                await guildMemberDb.save();

                const level = getLevel(guildMemberDb.xp!);
                if (level > oldLevel) {

                    const roleId: string | undefined = ranks[level as unknown as keyof typeof ranks];
                    if (roleId && !guildMember.roles.cache.has(roleId)) {
                      await guildMember.roles.add(roleId);
                      const role = guild.roles.cache.get(roleId);

                      if (role) {
                        await newState.channel?.send(
                          `Bravo ${guildMember}, tu es passé niveau ${level} et tu obtiens le rôle **${role.name}** ! :tada:`
                        );
                      }
                    } else {
                      await newState.channel?.send(
                          `Bravo ${guildMember}, tu es passé niveau ${level} ! :tada:`
                        );
                    }
                  }
            }, timeInterval)
        } else if (oldChannel && !newChannel && interval) {
            clearInterval(interval);
        }

    }
}
