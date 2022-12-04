import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import cron from "node-cron";
import { ranks } from "../config.json";
import { ActivityType } from "discord.js";

export class ReadyEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
      emitter: client,
    });
  }

  async execute() {
    console.log(`${this.client.user!.tag} is logged in`);

    const guild = await this.client.guilds.fetch("1041358976513753098");
    this.client.user?.setActivity(
      (await guild.members.fetch()).size + " membres",
      {
        type: ActivityType.Watching,
      }
    );

    // const links = [
    //   "https://media.discordapp.net/attachments/841201837021200394/1003450539884949605/test-banner-day0048.png?width=1191&height=670",
    //   "https://media.discordapp.net/attachments/841201837021200394/1003450540400844850/test_banner_night0048.jpg?width=1191&height=670",
    // ];
    // cron.schedule(
    //   "0 18,8 * * *",
    //   async () => {
    //     const guild = this.client.guilds.cache.get("977507903307145216");
    //     if (!guild) return;
    //     const hours = new Date().getHours();
    //     guild.setBanner(links[hours >= 8 && hours < 18 ? 0 : 1]);
    //   },
    //   {
    //     timezone: "Europe/Paris",
    //   }
    // );
  }
}
