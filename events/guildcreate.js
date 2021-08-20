const client = require('../index.js')
const Discord = require('discord.js')
const config = require('./../config/config.json')
const prefix = config.prefix


    client.on('guildCreate', async (guild) => {
let channelToSendTo;

guild.channels.cache.forEach((channel) => {
if (
   channel.type === 'text' &&
   !channelToSendTo &&
   channel.permissionsFor(guild.me).has('SEND_MESSAGES')


)
channelToSendTo = channel;
});
if (!channelToSendTo) return;
const newGuildEmbed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor(guild.name,guild.iconURL({ dynamic: true }))
.setTitle(`Thank you for inviting ${client.user.username}`)

.setDescription(`use ${prefix}help to see all the commands i have! if you have any issue join\ [Support Server](https://discord.gg/y4kEyjDYuE)`)
.setTimestamp()
.setFooter(client.user.username, client.user.displayAvatarURL())

channelToSendTo.send(newGuildEmbed)

});