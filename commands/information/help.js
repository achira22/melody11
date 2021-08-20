const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const client = require("../..");
const { prefix } = require("../..");
let color = "#36393f"




module.exports = {
    name: "help",
    aliases: ['h'],
    description: "Shows all available bot commands.",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {

        if (!args[0]) {
            let categories = [];


            //categories to ignore
            let ignored = [
                "owner",
                "mod"
            ];

        
            const emo = {
                games: "<a:ezgif37662c5200071:877209348382818374>",
                config: "<a:config:877210978767474708>",
                automod : "👍",
                giveaways: "<a:giveaways:877194295164141598>",
                information: "<:infomation:877204317021544528>",
                moderation: "<:moderation:877204679057084418>",
                music: "<a:music:877194524139614238>",
                filters: "<a:filters:877196010420584478>",
                special: "<a:owner:877196361253134387>",
                leveling: "🎂",
                rr_roles: "🙌",
                ticket: "🎫",
                utility: ":comet:",
                welcome_leave: "✨",
                rr_roles: "🎁",
                yt_poster : "📺",
                memes_page_1 : "<a:O2_lolpika:877193925578866768>",
                memes_page_2 : "<a:O2_lolpika:877193925578866768>",
                memes_page_3 : "<a:O2_lolpika:877193925578866768>",

                misc : "<a:misc:877193641943248926>",
                animals : "<:animals:877193376418648075>",
                anime : "<a:anime:877192937434398800>",

            }

            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`
                let cats = new Object();

                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                //cots.push(dir.toLowerCase());
            });

            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("HELP MENU 🔰 Commands")
                .addField('Prefix Information', `Prefix: \`${prefix}\`\nYou can also mention ${client.user} to get prefix info.`, false)
                .addField("• Developer", `\`\`\`yml\nName:⚡ACHIRA GAMING⚡#0001 [762689616008183859]\`\`\``)
                .addField("• Important Links", `**[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/y4kEyjDYuE)**`)
                .setDescription(
                    `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help music\`.`
                )
                .addFields(categories)
                .setFooter(`To see command descriptions and inforamtion, type: ${prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(color);

            return message.channel.send(embed);
        } else {
            let cots = [];
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    let des = client.commands.get(name).description;

                    let obj = {
                        cname: `\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                        value: co.des ? co.des : 'No Description',
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            // console.log(cots);

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)
                    .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
                    .setColor('RANDOM')
                    .setFooter(`Coded By Achira Gaming`)

                return message.channel.send(combed)
            }     else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(color);
      return message.channel.send(embed);
    }

            
        }
    },
};