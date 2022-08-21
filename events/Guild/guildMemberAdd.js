module.exports = async (client, member) => {
    if(member.guild.id !== "977507903307145216") return
    member.roles.add("985505448398577674")
    client.channels.cache.get("977511559234486352").send({content: `<:flower:997180854046556320> Arrivée de ${member} tout en douceur sur **UMaestro** !`})
}