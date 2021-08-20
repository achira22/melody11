const { MessageEmbed, MessageAttachment } = require("discord.js");
const { blue } = require("../../config/embed.json");

module.exports = {
  name: "door",
  aliases: [],
  category: "Memer",
  description: "IMAGE CMD",
  usage: "door @User",

  run: async (client, message) => {

    var tempmsg = await message.channel.send("<a:monophy:877191968298532904>")

    var user = message.mentions.users.first() || message.author;
    var avatar = user.displayAvatarURL({ format: "png" });

    client.memer.door(avatar).then(image => {

      var attachment = new MessageAttachment(image, "door.png");

      tempmsg.delete()
      
      const embed = new MessageEmbed()
      .setColor(blue)
      .setImage("attachment://door.png")
      .attachFiles(attachment)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
      return message.channel.send(embed).catch()
      
    })
      
  }
}