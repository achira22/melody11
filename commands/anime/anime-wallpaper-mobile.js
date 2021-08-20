const hmtai = require("hmtai");
const {MessageEmbed} = require (`discord.js`)
module.exports = {
   name:'anime-wallpaper-mobile',
   description: 'get anime-anime-wallpaper image for mobile',
   run: async(client,message,args,Discord)=>{
    
    
    let img = hmtai.mobileWallpaper();
        
        
        let hugEmbed = new MessageEmbed()
             .setTitle("anime mobile wallpaper")
             .setColor("RANDOM")
             .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL({ dynamic: true })
      )
             .setImage(img)
             .setTimestamp()
             message.channel.send(hugEmbed)

      .catch((err) => {
        console.error('api eror try again:', err)
      })
    }
}
        
        
        
    