const { MessageEmbed } = require("discord.js");
const emoji = require('../../config/emojis.json')
module.exports = {
    name: "mute",
    description: "Mutes The Mentioned User!",
    run: async (client, message, args) => {

const doggo = message.guild.members.cache.get(client.user.id);
        if (!message.member.hasPermission("MANAGE_ROLES", "BAN_MEMBERS")) {
            return message.channel.send("Sorry, You Don\'t Have Permissions To Mute Anyone!");
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES", "BAN_MEMBERS")) {
            return message.channel.send("Sorry, But I don\'t Have Permissions To Mute Anyone!")

        }

        const user = message.mentions.members.first()

var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());


        if (!user) {
            return message.channel.send("Please Mention The User I Need To Mute");
        }

        if (user.id === message.author.id) {
            return message.channel.send("Haha I See What You\'re Trying To Do Here xD");
        }

        let reason = args.slice(1).join(" ")

        if (!reason) {
            return message.channel.send("Please Give A Reason To Mute The Person!")
        }


        let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
         
        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        
                        permissions: []
                    }
                })
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false,
                        CONNECT: false,
                    })
                })
            } catch (e) {
                console.log(e);
            }
        };
        
        if (user.roles.highest.position > doggo.roles.highest.position)
                return message.reply(`${emoji.msg.ERROR} You cannot mute someone with an equal or higher role than me !!`)

        if (mutee.roles.cache.has(muterole.id)) return message.channel.send("**User Is Already Muted!**")

        const embed = new MessageEmbed()
        .setAuthor(`You Muted ${message.mentions.users.first().username} | Reason - ${reason}`)
        .setColor("RANDOM")
        



        try {
            user.roles.add(muterole)
        await message.channel.send(embed)
        user.send(`You Are Muted in ${message.guild.name} | Reason - ${reason}`)
        } catch (error){
            console.log(error)
            
        }

    }

}