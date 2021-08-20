const { MessageEmbed, MessageAttachment } = require("discord.js");
const { blue } = require("../../config/embed.json");

module.exports = {
  name: "pepesign",
  aliases: [],
  category: "Memer",
  description: "IMAGE CMD",
  usage: "pepesign [ Text ]",

  run: async (client, message, args) => {
    
    if (!args.length) return message.channel.send(new MessageEmbed().setColor("#ff000")
    .setDescription("**❌ Please provide some Text!**"))
    
    var tempmsg = await message.channel.send("<a:monophy:877191968298532904>")

    var text = args.join(" ")

    client.memer.pepesign(text).then(image => {

      var attachment = new MessageAttachment(image, "pepesign.png");

      tempmsg.delete()
      
      const embed = new MessageEmbed()
      .setColor(blue)
      .setImage("attachment://pepesign.png")
      .attachFiles(attachment)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
      return message.channel.send(embed).catch()
      
    })
      
  }
}

 