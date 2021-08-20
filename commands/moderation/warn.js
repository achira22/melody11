const warnSchema = require("../../utils/models/warnSchema");
const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "warn",
  description: "Warn Someone",
  usage: "[prefix]warn <@mention> [reason]",
  aliases: [],
  run: async (client, message, args) => {
    const mentionedUser =
      message.mentions.members.first() || message.guild.members.cache.get(args[0])
  
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) {
      const warnError = new MessageEmbed()
        .setDescription("You Do Not have Permission to Warn someone")
        .setColor("RANDOM");
      return message.channel.send(warnError);
    } else if (!mentionedUser) {
      const warnError2 = new MessageEmbed()
        .setDescription("You Need to mention a Member to warn them!")
        .setColor("RANDOM");
      return message.channel.send(warnError2);
    }
    const mentionedPosition = mentionedUser.roles.highest.position
    const memberPosition = message.member.roles.highest.position


    const reason = args.slice(1).join(" ") || "Not Specified";

    let warnDoc = await warnSchema
      .findOne({
        guildID: message.guild.id,
        memberID: mentionedUser.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc) {
      warnDoc = new warnSchema({
        guildID: message.guild.id,
        memberID: mentionedUser.id,
        warnings: [reason],
        moderator: [message.member.id],
        date: [Date.now()],
      });

      await warnDoc.save().catch((err) => console.log(err));
      const embed1 = new MessageEmbed()
      .setDescription(`Warned **${mentionedUser}** \n Reason: **${reason}**`)
        .setColor("RANDOM");
       
      return message.channel.send(embed1)
    } else {
      if (warnDoc.warnings.length >= 3) {
        return message.channel.send(
          "This member has already been warned 3 times, use ban command to ban this user from this guild or use unwarn to remove the warnings from this user"
        );
      }

      warnDoc.warnings.push(reason);
      warnDoc.moderator.push(message.member.id);
      warnDoc.date.push(Date.now());

      await warnDoc.save().catch((err) => console.log(err));

      const embed = new MessageEmbed()
        .setDescription(`Warned **${mentionedUser}** \n Reason: **${reason}**`)
        .setColor("RANDOM");
member.send(`You have been warned by ${message.author.username} for this reason: ${reason}`)
      return message.channel.send(embed);
    }
  },
};
