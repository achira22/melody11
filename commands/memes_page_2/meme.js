const discord = require("discord.js");
const reddit = require("reddit-scrapper");

 module.exports = {
    name: 'meme',
    aliases: ["m"],
    usage: "meme",
    description: "get a sinhala meme",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
    
    let listmeme = ["piefm","sinhalamemes"];
    let memeSearch = listmeme[Math.floor(Math.random() * listmeme.length)];
    
    let memeData = (await reddit({search:memeSearch})).data.filter((data) => data.nfsw!==true);
    let meme = memeData[Math.floor(Math.random() * memeData.length)];
    
    let title = meme.title,
        link  = meme.link,
        like  = meme.like,
        comment = meme.comment, 
        image = meme.image,
        author = meme.author
        if (!image || image ===""){
        return message.channel.send("im broke please try again");

        }

    const embed = new discord.MessageEmbed()
    .setTitle("POSTLINK")
    .addField(title ,`Author : ${author} `)
    .setURL(link)
    .setColor("RANDOM")
    .setImage(image)
    
    .setFooter(`${like}👍 | ${comment}💬`)
    .setTimestamp()
    return message.channel.send(embed);

    }
}
