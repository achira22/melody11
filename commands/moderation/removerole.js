const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'removerole',
    aliases: ['backrole'],
    description: 'remove role to any user',
    useage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        let target = message.mentions.members.first();
        if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(
            new MessageEmbed()
            .setColor(ee.wrongcolour)
            .setAuthor(message.author.tag)
            .setDescription("**You Dont Have The Permissions To Add Roles To Users! - [MANAGE_ROLES]**")
            .setFooter(ee.footertext , ee.footericon)
        );
        if (!message.guild.me.permissions.has("MANAGE_ROLES")) return  message.channel.send(
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription(" **I Dont Have The Permissions To Add Roles To Users! - [MANAGE_ROLES]**> ")
            .setFooter("Coded by: Achira Gaming")
        )
        
        if (!target) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription('**I am unable to find the user**')
                .setFooter("Coded by: Achira Gaming")
        )

        let rrole = message.mentions.roles.first();
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!rrole) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription('**I am unable to find the role**')
                .setFooter("Coded by: Achira Gaming")
        )
        if(!rMember.roles.cache.has(role.id)) {
            let rolDEL_err = new MessageEmbed()
            .setColor(`#FF0000`)
            .setDescription(`Error ❌ | ${rMember.displayName}, Does not have this role!`);
            return message.channel.send(rolDEL_err)
        }
        
        let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
        let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });

        const embed = new MessageEmbed()
            .setAuthor(target.user.username, ticon)
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(`${rrole} role removed from ${target}\n
            \`So Sad I Pray You Will Get Role Back\``)
            .setFooter(`Role removed by ${message.author.username}`, aicon)
            .setTimestamp()

        await message.channel.send(embed).then((msg => {
            msg.delete({ timeout: 7000 })
        }))

        target.roles.remove(rrole)
    }
}