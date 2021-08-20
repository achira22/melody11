const { Client, Message, MessageEmbed, discord } = require('discord.js');
const schema = require('../../utils/models/afkshema.js')

module.exports = {
    name: 'afk',
    aliases: [''],
    description: 'go to afk',
    useage: 'ascii <text>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
    
    let data;
    try {
        data = await schema.findOne({
            userId: message.author.id,
            
        })
        if(!data) {
            data = await schema.create({
                userId: message.author.id,
               
            })
        }
    } catch(e) {
        console.log(e)
    }
   const embed = new MessageEmbed()
   .setTitle('AFK')
   .setDescription("You are now afk")
   .setColor("RANDOM")
    message.channel.send(embed)
    data.AFK = true
    data.AFK_Reason = args.join(" ")
    await data.save()

}
}

