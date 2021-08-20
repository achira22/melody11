const Meme = require("memer-api");
const cooldowns = new Map();
const Discord = require("discord.js");
const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const AFKS = require("./utils/models/afkshema.js")
const fs = require("fs");
const colors = require("colors")
const functions = require("./handlers/function")
const config = require("./config/config.json");
const map = new Map()
require('canvas').registerFont("Genta.ttf", {
  family: "Genta"
}); //loading a font
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const DisTube = require("distube");
// MongoDB
client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;
function emoji(id){
  return client.emojis.get(id).toString ();
}

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log("MongoDB Conneted.."));
const https = require('https-proxy-agent');
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);
const prefix = config.prefix;
const  api_token = config.api_token;
client.memer = new Meme(api_token)
client.prefix = prefix;
client.config = config;
const token = config.token;
module.exports = client;
client.distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: false,
  highWaterMark: 1024 * 1021 * 64,
  leaveOnEmpty: false,
  leaveOnFinish: true,
  leaveOnStop: true,
  youtubeDL: true,
  updateYouTubeDL: true,
  customFilters: config.customs
  // youtubeCookie: config.ytk,
  // requestOptions: {
  //   agent
  // }
});
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "distube"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

["chatbot","jointocreate"].forEach(handler => {
  require(`./utils/etc/${handler}`)(client);
});



// host bot


 const express = require("express")
 const app = express();

 app.get("/", (req, res) => {
   res.send(`Pinging`)
 })

 app.listen(() => {
   console.log(`Server Started..`)
 })


//databases setups
const Enmap = require("enmap");
client.settings = new Enmap({
  name: "settings",
  ensureProps : false
  // dataDir: "./databases/settings"
});
client.setups = new Enmap({
  name: "setups",
  ensureProps : false
  // dataDir: "./databases/setups"
});
client.chatbot = new Enmap({
  name: "chatbot",
  ensureProps : false
  // dataDir: "./databases/setups"
});
client.infos = new Enmap({
  name: "infos",
  ensureProps : false
  // dataDir: "./databases/infos"
});
client.custom = new Enmap({
  name: "custom",
  ensureProps : false
  // dataDir: "./databases/playlist"
});
client.custom2 = new Enmap({
  name: "custom",
  ensureProps : false
  // dataDir: "./databases/playlist2"
});
client.jointocreatemap = new Enmap({
  name: "settings",
  ensureProps : false
  // dataDir: "./databases/playlist2"
});


/// giveawat bot

// Initialise discord giveaways
const { GiveawaysManager } = require("discord-giveaways");
const { settings } = require("cluster");
client.giveawaysManager = new GiveawaysManager(client, {
  updateCountdownEvery: 3000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
  

/* Client's GiveawaysManager Events */
client.giveawaysManager.on(
  "giveawayReactionAdded",
  async (giveaway, reactor, messageReaction) => {
    if (reactor.user.bot) return;
    try {
      if (giveaway.extraData) {
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
      }
      reactor.send(
        new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle("Entery Approved! | You have a chance to win!!")
          .setDescription(
            `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been approved!`
          )
          .setFooter("Coded By ACHIRA GAMING")
          .setTimestamp()
      );
    } catch (error) {
      const guildx = client.guilds.cache.get(giveaway.extraData.server)
      messageReaction.users.remove(reactor.user);
      reactor.send(new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(":x: Entery Denied | Databse Entery Not Found & Returned!")
        .setDescription(
          `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied as you did not join **${guildx.name}**`
        )
        .setFooter("Coded By ACHIRA GAMING")
      );
    }
  }
);
// Check if user reacts on an ended giveaway
client.giveawaysManager.on('endedGiveawayReactionAdded', (giveaway, member, reaction) => {
  reaction.users.remove(member.user);
  member.send(`**Aw snap! Looks Like that giveaway has already ended!**`)

});
// Dm our winners
client.giveawaysManager.on('giveawayEnded', (giveaway, winners) => {
  winners.forEach((member) => {
    member.send(new Discord.MessageEmbed()
      .setTitle(`🎁 Let's goo!`)
      .setDescription(`Hello there ${member.user}\n I heard that you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n Good Job On Winning **${giveaway.prize}!**\nDirect Message the host to claim your prize!!`)
      .setTimestamp()
      .setFooter(member.user.username, member.user.displayAvatarURL())
    );
  });
});
// Dm Rerolled winners
client.giveawaysManager.on('giveawayRerolled', (giveaway, winners) => {
  winners.forEach((member) => {
    member.send(new Discord.MessageEmbed()
      .setTitle(`🎁 Let's goo! We Have A New Winner`)
      .setDescription(`Hello there ${member.user}\n I heard that the host rerolled and you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n Good Job On Winning **${giveaway.prize}!**\nDirect Message the host to claim your prize!!`)
      .setTimestamp()
      .setFooter(member.user.username, member.user.displayAvatarURL())
    );
  });
});
// When They Remove Reaction
client.giveawaysManager.on('giveawayReactionRemoved', (giveaway, member, reaction) => {
  return member.send(new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle('❓ Hold Up Did You Just Remove a Reaction From A Giveaway?')
    .setDescription(
      `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) was recorded but you un-reacted, since you don't need **${giveaway.prize}** I would have to choose someone else 😭`
    )
    .setFooter("Think It was a mistake? Go react again!")
  );
});


client.on("message", async (message) => {
  const { escapeRegex } = require("./handlers/function");
  if(message.author.Client || message.channel.type === "dm") return;
let data2;
  try {
      data2 = await AFKS.findOne({
          userId: message.author.id,
          
      })
      if(!data2) {
          data2 = await AFKS.create({
              userId: message.author.id,
              
          })
      }
  } catch (error) {
      console.log(error)
  }

  if(data2.AFK === true) {
      data2.AFK_Reason = null
      data2.AFK = false
       const noafk = new MessageEmbed()
          .setTitle(`You ain't afk anymore`)
          
          .setColor("GREEN")
      message.channel.send(noafk)
      await data2.save()
  }

  

  if(message.mentions.members.first()) {
      let data3;
      try {
          data3 = await AFKS.findOne({
              userId: message.mentions.members.first().id,
              
          })
          if(!data3) {
              data3 = await AFKS.create({
                  userId: message.mentions.members.first().id,
                  
              })
          }
      } catch (error) {
          console.log(error)
      }
  
      if(data3.AFK == true) {
          const afkembed = new MessageEmbed()
          .setTitle(`${message.mentions.members.first().user.tag} is curruntly AFK`)
          .setDescription(`AFK Reason: ${data3.AFK_Reason || "No Reason"}`)
          .setColor("RED")
        message.channel.send(afkembed)
      }
  
  }
  
  // // anti invite 
  // let regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/
  // if (regex.test(message.content) && client.settings.get(message.guild.id, "antiinvite")) {
  //   if (message.member.permissions.has("ADMINISTRATOR")) return;
  //   message.reply(`***${message.author.tag}***, invite links are not allowed!`).then(m => m.delete({ timeout: 10000 }))
  //   message.author.send(`** Oye , Don't Send Invite Link In Server **`)
  //   message.delete()
  // }



  // // image only set
  // if (client.settings.get(message.guild.id, "imagechannel").length) {
  //   for (let i = 0; i < client.settings.get(message.guild.id, "imagechannel").length; i++) {
  //     if (client.settings.get(message.guild.id, "imagechannel")[i] === message.channel.id && message.attachments.size < 1) {
  //       message.delete()
  //       message.author.send('You said something that was not an image in an `image only` channel!')
  //     }
  //   }
  // }

  if (message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (prefix === null) prefix = config.prefix;
  if (message.partial) await message.fetch();
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) {
    if (matchedPrefix.includes(client.user.id)) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setFooter("Made By Achira gaming")
          .setAuthor(message.author.tag)
          .setTitle(`You Mention me , Hahaha `)
          .setDescription(
            `<@${message.author.id}>To see all Commands type: \`${prefix}help\``
          )
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      );
    }
  }

  


  if(cmd.length === 0){
    if(message.mentions.has(message.guild.owner.id)){
      message.reply(`Don't Ping Owner Noob...`)
    }
  }
});



client.login(config.token);
