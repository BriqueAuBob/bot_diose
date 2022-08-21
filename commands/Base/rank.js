const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageAttachment, MessageEmbed, UserFlags } = require("discord.js")
const {registerFont, createCanvas, loadImage} = require("canvas")
const data = require("../../events/exp/data.json")
module.exports = {
    help: {
        name: "rank"
    },
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Voir son niveau")
        .addUserOption(option => option.setName('utilisateur').setDescription('Selectionnez un utilisateur')),
    async execute(interaction) {
        await interaction.reply({content: "Génération de la rankcard.."})
        const user = interaction.options.getUser('utilisateur') || interaction.user
        const userId = user.id
        const defaultData = {
            exp: 0,
            max: 150,
            level: 1
        }
        const userData = data[data.indexOf(data.find(d => d.userId === userId))] || defaultData
        
        const getRank = (rankData) => {
            if(rankData === defaultData) {
                return interaction.guild.memberCount
            } else {
                const array = data
                data.sort((a, b) => {
                    if(a.level === b.level) {
                        return b.exp - a.exp
                    } else {
                        return b.level - a.level
                    }
                })
            const i = data.indexOf(data.find(data => data.userId === userId))
            return i+1
            }
        }
        const guildIcon = user.displayAvatarURL({format: "png", size: 1024}) || "https://logodownload.org/wp-content/uploads/2017/11/discord-logo-4-1.png"
    
   
        registerFont('aBigDeal.otf', { family: 'Big Deal' })

        const document = await createCanvas(2738, 1028)
        const ctx = document.getContext("2d")

        const background = await loadImage("./Images/user_background.png")
        ctx.drawImage(background, 0, 0, 2738, 1028)

        const pfp = await loadImage("./Images/user_pfp.png")

        ctx.drawImage(pfp, 250, 250, 500, 500)

        ctx.font = "170px Big Deal"
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        var name = user.username
        
        ctx.fillText(`${name}`, 2738*(3/5), 1028*(2/5)+50)
        ctx.font = "80px Big Deal"
       
        ctx.fillText(`RANG: #${getRank(userData)}`, 2738*(1/3)+150, 1028*(3/5)+50)
        
        ctx.fillText(`LVL: ${userData.level}`, 2738*(2/3)-280, 1028*(3/5)+50)
       
        ctx.fillText(`EXP: ${userData.exp}/${userData.max}`, 2738*(2/3)+300, 1028*(3/5)+50)

        ctx.beginPath()
        ctx.arc(500, 500, 464 / 2, 0, Math.PI * 2, true)
        ctx.stroke()
        ctx.closePath()
        ctx.clip()

        const avatar = await loadImage(guildIcon)
        ctx.globalAlpha = 1
        ctx.drawImage(avatar, 250, 250, 500, 500)

        const attachment = new MessageAttachment(document.toBuffer(), "banner.png");
        
        const message = await interaction.fetchReply()
        await message.edit({ files: [attachment] })
        
    }
}