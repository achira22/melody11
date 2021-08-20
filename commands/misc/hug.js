const Math = require('mathjs');
const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const {MessageEmbed} = require (`discord.js`)
module.exports = {
   name:'hug',
   description: 'hug you friend',
   run: async(client,message,args,Discord)=>{
    
    words = [
      "a hug :heart:",
      "a big hug :heart:",
      "a hug ! Don't squeeze too hard!",
      
      



  ]
    
    let { image } = await API.sfw.hug()

personHugged = message.mentions.users.first()
if(!personHugged) return message.channel.send(
    new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription("**Please mention a user to hug!**")
        .setFooter("Coded by: Achira Gaming")
).then(msg => {msg.delete({timeout:3000})&& message.delete();
})
    if (message.author.id === personHugged.id) {
      return message.channel.send(
          new MessageEmbed()
              .setColor("RED")
              .setAuthor(message.author.tag)
              .setDescription("**You can not hug yourself**")
              .setFooter("Coded by: Achira Gaming")
      ).then(msg => {msg.delete({timeout:3000})&& message.delete();
    })
  }
   
    if (personHugged){


     let hugEmbed = new MessageEmbed()
             .setTitle(`${message.author.username} gives to ${personHugged.username} ${words[Math. floor(Math. random()*words. length)]}`)
             .setColor("RANDOM")
             
             .setImage(image)
             .setTimestamp()
             message.channel.send(hugEmbed)
    


}
}
}