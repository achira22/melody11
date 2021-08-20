const client = require('../index.js')
const Discord = require('discord.js')
const config = require('./../config/config.json')
const prefix = config.prefix
const { joinserverID } = require('./../data/channelIDs.json')

    client.on('guildDelete', async (guild) => {



    const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(`New guild added`)
    
    .setDescription(`member count : ${guild.memberCount}`)
    
    .setAuthor(guild.name,guild.iconURL({ dynamic: true }))
    
    .setTimestamp()
    .setFooter(`Total servers ${client.guilds.cache.size}`)
    
    

    await  client.channels.cache.get(joinserverID).send(embed)


    



});


