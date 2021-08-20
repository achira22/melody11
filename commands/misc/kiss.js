const Math = require('mathjs');
const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const {MessageEmbed} = require (`discord.js`)
module.exports = {
   name:'kiss',
   description: 'kiss your friend',
   run: async(client,message,args,Discord)=>{
    
    words = [
      "kisses",
      "kissed",
      
  ]
    words1=[
      "lip's :heart:",
      "cute :heart:",
      "",
    ]
    let { image } = await API.sfw.kiss()

personHugged = message.mentions.users.first()
if(!personHugged) return message.channel.send(
    new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription("**Please mention a user to kiss!**")
        .setFooter("Coded by: Achira Gaming")
).then(msg => {msg.delete({timeout:3000})&& message.delete();
})
    if (message.author.id === personHugged.id) {
      return message.channel.send(
          new MessageEmbed()
              .setColor("RED")
              .setAuthor(message.author.tag)
              .setDescription("**You can not kiss yourself**")
              .setFooter("Coded by: Achira Gaming")
      ).then(msg => {msg.delete({timeout:3000})&& message.delete();
    })
  }
   
   
    if (personHugged){

     let hugEmbed = new MessageEmbed()
             .setTitle(`${message.author.username} ${words[Math. floor(Math. random()*words. length)]} ${personHugged.username} ${words1[Math. floor(Math. random()*words1. length)]}`)
             .setColor("RANDOM")
             
             .setImage(image)
             .setTimestamp()
             message.channel.send(hugEmbed)
    


}
}
}