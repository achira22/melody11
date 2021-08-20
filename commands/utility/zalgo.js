const { Client, Message, MessageEmbed } = require('discord.js');
const Zalgo = require('to-zalgo')


module.exports = {
    name: 'zalgo',
    aliases: ['zlg'], 
    description: 'Converts your text to Zalgo',
    usage: 'zalgo <text>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const zlg = args[0]
        if(!zlg) return message.channel.send("Please Provide A  text.") // If No Packge In Searched.
        message.channel.send(
            new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(message.author.tag)
            .setTitle(`Your Text ${args.join(" ")}`)
            .setDescription(`${Zalgo(args.join(" "))}`)
            .setTimestamp()
        )

    }
}