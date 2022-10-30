const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")



module.exports = {
    help: {
        name: "giveaway-end"
    },
    data: new SlashCommandBuilder()
        .setName("giveaway-end")
        .setDescription("Finir un giveaway")
        .addStringOption(option => option.setName('id').setDescription('\'identifiant du giveaway').setRequired(true))
        .addStringOption(option => option.setName('gagnants').setDescription('Nombre de gagnants').setRequired(true)),


    async execute(interaction) {
      
        const message = await interaction.channel.messages.fetch(interaction.options.getString('id'))
        const reaction = await message.reactions.cache.get("🎉").fetch()
        const winners = parseInt(interaction.options.getString('gagnants'))
                                    const users = await reaction.users.fetch()
                                    const winnerList = [];
                                    const participants = [];
                                    users.forEach(( user ) => {
                                        if(!user.bot) participants.push(user)
                                    });
                                        
                                        for(let i = 0; i < winners; i++) {
                                            const random = Math.floor(Math.random() * participants.length);
                                            const winner = participants[random];
                                            const winIndex = participants.indexOf(winner);
                                            participants.splice(winIndex, 1);
                                            winnerList.push(winner);
                                        }
                                    
                                        interaction.reply({ content: `Bien joué au(x) gagnant(s) du giveaway qui est : ${winnerList.join(", ")}`});
                                    
    }
}
