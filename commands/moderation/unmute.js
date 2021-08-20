const { MessageEmbed } = require("discord.js");
const emoji = require('../../config/emojis.json')


module.exports = {
    name: "unmute",
    description: "Use This To Unmute A Muted Person!",
    run: async (client, message, args) => {
const doggo = message.guild.members.cache.get(client.user.id);
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Sorry, You Don\'t Have Permissions To Unmute Anyone!");
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Sorry, But I don\'t Have Permissions To Unmute Anyone!")

        }
        let reason = args.slice(1).join(" ")
        var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());

        if (!reason) {
            return message.channel.send("Please Give A Reason To un mute The Person!")
        }
        const user = message.mentions.members.first();

        if (!user) {
            return message.channel.send("Please Mention The User I Need To Unmute!")
        }
        if (user.id === message.author.id) {
            return message.channel.send("You\'re Not Muted If You Just Sent A Command :)")
        }
if (user.roles.highest.position > doggo.roles.highest.position)
                return message.reply(`${emoji.msg.ERROR} You cannot unmute someone with an equal or higher role than me !!`)

        let muterole = message.guild.roles.cache.find(x => x.name === 'Muted')


        if (!muterole) return message.channel.send("**There Is No Mute Role To Remove!**")
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send("**User is not Muted!**")

const embed = new MessageEmbed()
      .setAuthor(`You Unmuted ${message.mentions.users.first().username}`)
      .setFooter("Verbal Warn - Don\'t Do something that\'s gonna get you Muted")
      .setColor("RANDOM")

        user.roles.remove(muterole)
        await message.channel.send(embed)
        user.send(`You Muted ${message.mentions.users.first().username} | Reason - ${reason}`)








    }
}