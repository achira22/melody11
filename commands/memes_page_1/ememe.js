const fetch = require("node-fetch")
const { MessageEmbed } = require (`discord.js`)
module.exports = {
   name:'ememe',
   aliases: ["em"],
   description: 'get fresh english meme',
   run: async(client,message,args)=>{
    
    fetch('https://meme-api.herokuapp.com/gimme')
      .then(res => res.json())
      .then(async json => {
        
        
        let memeEmbed = new MessageEmbed()
             .setTitle("POSTLINK")
             .addField(json.title,`Author : ${json.author}`)
             .setColor("RANDOM")
             .setFooter(`${json.ups}👍 | ${json.subreddit} subreddit `)
            .setURL(json.postLink)
             .setImage(json.url)
             .setTimestamp()
             message.channel.send(memeEmbed)

      })
      .catch((err) => {
        console.error('api eror try again:', err)
      })
  }
}