const { MessageEmbed, MessageAttachment } = require("discord.js");
const { blue } = require("../../config/embed.json");

module.exports = {
  name: "tweet",
  aliases: [],
  category: "Memer",
  description: "IMAGE CMD",
  usage: "tweet @User [ Text ]",

  run: async (client, message, args) => {
    
    if (!args.length) return message.channel.send(new MessageEmbed().setColor("#ff000")
    .setDescription("**❌ Please provide some Text!**"))
    
    var tempmsg = await message.channel.send("<a:monophy:877191968298532904>")
    
    var user = message.mentions.users.first();
    if(user) args.shift();
    else user = message.author;

    var avatar = user.displayAvatarURL({ format: "png" });


    var text = args.join(" ")

    if (!text) {
      tempmsg.delete();
      return message.channel.send(new MessageEmbed().setColor("#ff595e")
      .setDescription("**<:x2:819613332892942347> Please provide some Text!**"))  
    }

    client.memer.tweet(avatar, user.username, text).then(image => {

      var attachment = new MessageAttachment(image, "tweet.png");

      tempmsg.delete()
      
      const embed = new MessageEmbed()
      .setColor(blue)
      .setImage("attachment://tweet.png")
      .attachFiles(attachment)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
      return message.channel.send(embed).catch()
      
    })
      
  }
}

 