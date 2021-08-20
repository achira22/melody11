const {MessageEmbed} = require (`discord.js`)
const api = require("imageapi.js")
module.exports={
 name: "reddit",
 aliases: ["r"],
 usage: "<subreddit>",
 description: "get a english meme",
 run: async(bot,message,args)=>{
let Subreddit = message.content.slice(8)
if(!Subreddit)return message.channel.send(`you did not specify your subreddit`)

try{
    let img = await api (Subreddit)
    const Embed = new MessageEmbed()
    .setTitle(`a random image from r/${Subreddit}`)
    .setColor(`RANDOM`)
    .setImage(img)
    .setURL(`https://reddit.com/r/${Subreddit}`)
    message.channel.send(Embed)

}catch(err){
    return message.channel.send(err)


}

 }


} 