const data = require("./data.json")
const fs = require("fs")
const map = new Map()
module.exports = async (client, message) => {
    if(message.author.bot || message.system) return
    if(message.guild.id !== "977507903307145216") return
    const userId = message.author.id
    if(!data.find(d => d.userId === userId)) {
        data.push({
            userId: userId,
            level: 1,
            exp: 0,
            max: 150
        })
        fs.writeFileSync("./events/exp/data.json", JSON.stringify(data))
    }
    if(map.has(userId)) return
    const userData = data.find(d => d.userId === userId)
    var xp = Math.floor(Math.random() * (25 - 15) + 15)
    if(message.member.roles.cache.has("989116224707362879")) xp = xp*2
    const userMax = userData.max
    const userExp = userData.exp
    const userLevel = userData.level
    const i = data.indexOf(data.find(data => data.userId === userId))
    if((userExp+xp) >= userMax) {
        const xpToAdd = (userExp+xp) - userMax
        const newLevel = userLevel+1
        const newMax = Math.floor(userMax*1.15)
        data[i].level = newLevel
        data[i].exp = xpToAdd
        data[i].max = newMax
        message.channel.send({content: `GG à ${message.author} qui passe niveau **${newLevel}** !`})
        fs.writeFileSync("./events/exp/data.json", JSON.stringify(data))
    } else {
        data[i].exp = userExp+xp
        fs.writeFileSync("./events/exp/data.json", JSON.stringify(data))
    }
    if(data[i].level >= 5) {
        if(!message.member.roles.cache.has("995331593604452433")) message.member.roles.add("995331593604452433")
    } 
    if(data[i].level >= 10) {
        if(!message.member.roles.cache.has("985505372922085467")) message.member.roles.add("985505372922085467")
    } 
    if(data[i].level >= 20) {
        if(!message.member.roles.cache.has("985505302793306142")) message.member.roles.add("985505302793306142")
    }
    if(data[i].level >= 35) {
        if(!message.member.roles.cache.has("1001218568358219786")) message.member.roles.add("1001218568358219786")
    }
    map.set(userId, {test: true})
    setTimeout(() => {
        map.delete(userId)
    }, 60000)
}