const { prefix } = require('../index')
const client = require('../index')
const Discord = require('discord.js')
const { botolineID } = require('./../data/channelIDs.json')

client.on('ready', async (bot, message, args,) => {
  client.user.setStatus('dnd');
  console.log(`${client.user.username} ✅`)
  client.user.setActivity(`${prefix}help`)
  const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`bot is online`)
        .setDescription(`**ready on ${client.guilds.cache.size} servers,for a total of ${client.users.cache.size} users**`)
        .setAuthor(`${client.user.username}`,client.user.displayAvatarURL({
          dynamic: true
      }))
      .setTimestamp()

        await  client.channels.cache.get(botolineID).send(embed)
  client.user.setActivity(`${prefix}help`)
})