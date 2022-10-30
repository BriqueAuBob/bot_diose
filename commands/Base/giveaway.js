
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")



module.exports = {
    help: {
        name: "giveaway"
    },
    data: new SlashCommandBuilder()
        .setName("giveaway")
        .setDescription("Faire un giveaway")
        .addStringOption(option => option.setName('durée').setDescription('La durée ex: 2d (2 jour)').setRequired(true))
        .addStringOption(option => option.setName('prix').setDescription('Le prix à gagner').setRequired(true))
        .addStringOption(option => option.setName('gagnants').setDescription('Le nombre de gagnants').setRequired(true))
        .addChannelOption(option => option.setName('salon').setDescription('Salon ou le message va être envoyé')),


    async execute(interaction) {
        const winners = parseInt(interaction.options.getString('gagnants'))
        const channel = interaction.options.getChannel('salon') || interaction.channel
        const duration = interaction.options.getString('durée')
        const prize = interaction.options.getString('prix')
        if ((!duration.endsWith("s") && !duration.endsWith("m") && !duration.endsWith("h") && !duration.endsWith("d")) || isNaN(parseInt(duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1)))) {
            return interaction.reply({ content: "Vous deviez indiquer la durée du giveaway..", ephemeral: true });
        }
        var time;
        if (duration.endsWith("s")) {
            time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 1;
        } else if (duration.endsWith("m")) {
            time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 60;
        } else if (duration.endsWith("h")) {
            time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 3600;
        } else if (duration.endsWith("d")) {
            time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 86400;
        }
        const getTimeRemaining = (time) => {
            if (time < 60) {
                return `**${time}** secondes`;
            } else if (time >= 60 && time < 3600) {
                const minutes = Math.floor(time / 60);
                timeNotCalc = time - 60 * minutes;
                const seconds = Math.floor(timeNotCalc);
                return `**${minutes}** minutes et **${seconds}** secondes`;
            } else if (time >= 3600 && time < 86400) {
                const hours = Math.floor(time / 3600);
                timeNotCalc = time - 3600 * hours;
                const minutes = Math.floor(timeNotCalc / 60);
                timeNotCalc = timeNotCalc - 60 * minutes;
                const seconds = Math.floor(timeNotCalc);
                return `**${hours}**h, **${minutes}**, **${seconds}**s`;
            } else if (time >= 86400) {
                const days = Math.floor(time / 86400);
                timeNotCalc = time - 86400 * days;
                const hours = Math.floor(timeNotCalc / 3600);
                timeNotCalc = timeNotCalc - 3600 * hours;
                const minutes = Math.floor(timeNotCalc / 60);
                timeNotCalc = timeNotCalc - 60 * minutes;
                const seconds = Math.floor(timeNotCalc);
                return `**${days}**j, **${hours}**h, **${minutes}**, **${seconds}**s`;

            }
        }
        const giveawayEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription(`Prix: **${prize}**\nAuteur: ${interaction.member}\nTemps restant ${getTimeRemaining(time)}\nGagnants: **${winners}**`)
        const giveaway = await channel.send({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY** 🎉" });
        await interaction.reply({content: "Giveaway lancé !", ephemeral: true})
        giveaway.react("🎉")
        const interval = setInterval(async function () {
            if ((time - 13) > 0) {
                time = time - 13;
                giveawayEmbed.setDescription(`Prix: **${prize}**\nAuteur: ${interaction.member}\nTemps restant ${getTimeRemaining(time)}\nGagnants: **${winners}**`);
                giveaway.edit({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY** 🎉" });
            } else {
                clearInterval(interval);
                const reaction = await giveaway.reactions.cache.get("🎉").fetch()
                const users = await reaction.users.fetch()
                const winnerList = [];
                const participants = [];
                users.forEach((user) => {
                    if (!user.bot) participants.push(user)
                });
                if (participants.length < winners) {
                    giveawayEmbed.setDescription(`Prix: **${prize}**\nGiveaway annulé, pas assez de participants..`);
                    giveaway.edit({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY FINI** 🎉" });
                } else {

                    for (let i = 0; i < winners; i++) {
                        const random = Math.floor(Math.random() * participants.length);
                        const winner = participants[random];
                        const winIndex = participants.indexOf(winner);
                        participants.splice(winIndex, 1);
                        winnerList.push(winner);
                    }
                    giveawayEmbed.setDescription(`Prix: **${prize}**\nGagnant(s): ${winnerList.join(", ")}`);
                    giveaway.edit({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY FINI** 🎉" });
                    giveaway.channel.send({ content: `Bien joué au(x) gagnant(s) de **${prize}** : ${winnerList.join(", ")}` });
                }
            }
        }, 13000)

    }
}
