const {MessageEmbed} = require("discord.js")

module.exports = {
     name: 'embed',
    aliases: ['embed'],
    description: 'create embed',
     // You Can Keep Any Name
    permissions: ['MANAGE_MESSAGES'], // You Can Keep Any Permission
    permissionError: 'You Cant Use This Command', // Optional
    description: 'Creates An Embed For You With Out Code | >embed - Title - Description-Footer-Color^Thumbnail^Link^Image-Link', // Optional
    usage: '>embed Color - Title - author - Description - Footer - Image-Link - Thumbnail - Link', // Optional

    run: async (client, message, args,Discord) => {
  if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.channel
                .send("You do not have the required permission to use this command.").then(msg => {msg.delete({timeout:3000})&& message.delete();
    })
                

    const msgcontent = args.join(' ')
    const msgsplit = msgcontent.split(' - ')
    
     
  
    const color = msgsplit[0]
    const title = msgsplit[1] 
    const author = msgsplit[2] 
    const description = msgsplit[3] 
    const footer = msgsplit[4]
    const image = msgsplit[5]
    const thumbnail = msgsplit[6]
    const link = msgsplit[7]
    

 if(!color) return message.channel.send('Provide color hex For Embed.').then(msg => {msg.delete({timeout:3000})&& message.delete();
    })  
   if(!title) return message.channel.send('Provide Title For Embed.').then(msg => {msg.delete({timeout:3000})&& message.delete();
    })  
   
   if(!author) return message.channel.send('Provide author For Embed.').then(msg => {msg.delete({timeout:3000})&& message.delete();
    })  
   if(!description) return message.channel.send('Provide description For Embed.').then(msg => {msg.delete({timeout:3000})&& message.delete();
    })  
   
   if(!footer) return message.channel.send('Provide footer For Embed.').then(msg => {msg.delete({timeout:3000})&& message.delete();
    })  
   
   if(!image) return message.channel.send('Provide image link For Embed.').then(msg => {msg.delete({timeout:3000})&& message.delete();
    }) 

    if(!thumbnail) return message.channel.send('Provide thumbnail link For Embed.').then(msg => {msg.delete({timeout:3000})&& message.delete();
    })

    if(!link) return message.channel.send('Provide link For Embed Title.').then(msg => {msg.delete({timeout:3000})&& message.delete();
    })
     
  
        
        const embed = new MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setColor(`${color}`)
        .setImage(`${image}`)
        .setAuthor(`${author}`)
        .setURL(`${link}`)
        .setFooter(`${footer}`)
        .setThumbnail(`${thumbnail}`)

        message.channel.send(embed) 
    }
}