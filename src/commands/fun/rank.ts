import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction, GuildMember } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";
import memberDb from "../../models/member";
import getLevel, { getLevelXp } from "../../functions/getlevel";
import { createCanvas, loadImage } from "canvas";
import type { CanvasRenderingContext2D } from "canvas";
import roundRect from "../../functions/roundrect";

export default class extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "rank",
      description: "Voir le niveau d'un membre",
      type: "SLASH_COMMAND",
      category: "Fun",
      options: [
        {
          name: "member",
          description: "Voir le niveau de ce membre",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
      ],
    });
  }

  private async drawAvatar(ctx: CanvasRenderingContext2D, member: GuildMember) {
    const avatar = await loadImage(
      member.user.displayAvatarURL({ extension: "png", size: 1024 })
    );

    ctx.beginPath();
    ctx.arc(500, 500, 464 / 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 250, 250, 500, 500);
  }

  private drawTexts(
    ctx: CanvasRenderingContext2D,
    member: GuildMember,
    level: number,
    xp: number,
    nextLevelXp: number
  ) {
    ctx.font = "bold 120px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(member.user.username, 1000, 320);
    ctx.font = "bold 70px sans-serif";
    ctx.fillText(`Niveau ${level}`, 1000, 420);
    ctx.font = "bold 50px sans-serif";
    ctx.fillText(`${xp} / ${nextLevelXp} XP`, 1000, 500);
  }

  private drawProgressBar(
    ctx: CanvasRenderingContext2D,
    xp: number,
    nextLevelXp: number
  ) {
    const progress = (xp / nextLevelXp) * 100;
    const barHeight = 100;
    const outline = 16;
    ctx.fillStyle = "#404040";
    roundRect(ctx, 1000, 600, 1000, barHeight, barHeight / 2, true, false);
    ctx.fillStyle = "#fff";
    roundRect(
      ctx,
      1000 + outline / 2,
      600 + outline / 2,
      (1000 * progress) / 100 - outline,
      barHeight - outline,
      (barHeight - outline) / 2,
      true,
      false
    );
  }

  async execute(interaction: CommandInteraction) {
    const member =
      (interaction.options.getMember("member") as GuildMember) ||
      interaction.member;

    const user = await memberDb.findOne({
      userID: member!.id,
    });

    if (!user) {
      return interaction.reply(`Le membre ${member} n'a pas encore de niveau.`);
    }

    const level = getLevel(user.xp!);
    const nextLevelXp = getLevelXp(level + 1);

    const background = await loadImage("./assets/images/rank_background.png");
    const canvas = createCanvas(2738, 1028);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    this.drawTexts(ctx, member, level, user.xp || 0, nextLevelXp);
    this.drawProgressBar(ctx, user.xp || 0, nextLevelXp);
    await this.drawAvatar(ctx, member!);

    interaction.reply({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "rank.png",
        },
      ],
    });
  }
}
