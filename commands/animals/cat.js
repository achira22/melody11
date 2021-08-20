const Commando = require('discord.js-commando')
const axios = require('axios')
const {MessageEmbed} = require (`discord.js`)
module.exports = {
   name:'cat',
   description: 'shows cat',
   run: async(client,message,args,Discord)=>{
    axios
      .get('https://api.thecatapi.com/v1/images/search')
      .then((res) => {
        
        
        let hugEmbed = new MessageEmbed()
             .setTitle(`cute cat :heart:`)
             .setColor("RANDOM")
             .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL({ dynamic: true })
      )
             .setImage(res.data[0].url)
             .setTimestamp()
             message.channel.send(hugEmbed)

      })
      .catch((err) => {
        console.error('api eror try again:', err)
      })
  }
}