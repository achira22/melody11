const Discord = require('discord.js')
const { bugreportID } = require('../../data/channelIDs.json')

module.exports = {
    name: "bug",
    description: "feedback a bug (console.log)",

    async run (bot, message, args) {
        if(!args[0]) return message.reply('Please specify a bug!')

        message.reply(`✉ | ${message.author.username}, Thanks for finding the bug! :)`)

        console.log('Bug: ' + `(username)` + message.author.username,'#'+message.author.discriminator, `(UserId)`+ message.author.id, `(serverName)`+message.guild.name, `(serverId)`+ message.guild.id)

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) Fedback:`)
        .setDescription(`${args}`)
        .addField("On the server:", `${message.guild.name}`)
        .addField("Server ID:", `${message.guild.id}`)

        bot.channels.cache.get(bugreportID).send(embed)
    }
}