const client = require('nekos.life');
const neko = new client();
const {MessageEmbed} = require (`discord.js`)
module.exports = {
   name:'neko',
   description: 'get neko image',
   run: async(client,message,args,Discord)=>{
    
    
    neko.sfw.neko()
    .then((res) => {
        
        
        let hugEmbed = new MessageEmbed()
             .setTitle(`neko`)
             .setColor("RANDOM")
             .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL({ dynamic: true })
      )
             .setImage(res.url)
             .setTimestamp()
             message.channel.send(hugEmbed)

      })
      .catch((err) => {
        console.error('api eror try again:', err)
      })
    }
}
        
        
        
    