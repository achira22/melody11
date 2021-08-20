const client = require('nekos.life');
const neko = new client();
const {MessageEmbed} = require (`discord.js`)
module.exports = {
   name:'cuddle',
   description: 'cuddle you friend',
   run: async(client,message,args,Discord)=>{
    
    
    
     

personHugged = message.mentions.users.first()
   if(!personHugged) return message.channel.send(
    new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription("**Please mention a user to cuddle!**")
        .setFooter("Coded by: Achira Gaming")
).then(msg => {msg.delete({timeout:3000})&& message.delete();
})
    if (message.author.id === personHugged.id) {
      return message.channel.send(
          new MessageEmbed()
              .setColor("RED")
              .setAuthor(message.author.tag)
              .setDescription("**You can not cuddle yourself**")
              .setFooter("Coded by: Achira Gaming")
      ).then(msg => {msg.delete({timeout:3000})&& message.delete();
    })
  }
  
  neko.sfw.cuddle()
  .then((res) => {

    if (personHugged){


     let hugEmbed = new MessageEmbed()
             .setTitle(`${message.author.username} cuddle ${personHugged.username}:heart:`)
             .setColor("RANDOM")
             
             .setImage(res.url)
             .setTimestamp()
             message.channel.send(hugEmbed)
    

    }

    })
   }
}

