const { Collection, MessageEmbed, Client } = require('discord.js');
const { prefix } = require('../index');
const client = require('../index')
const config = require('../config/config.json')


client.on('message', async (message) => {

	//if(message.channel.type === 'dm') return;

  if (!message.guild) return;
  client.chatbot.ensure(message.guild.id, { channels: [] });
	
  if (message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd)||client.commands.get(client.aliases.get(cmd));
  

  if (!command) return;
if (command) message.react('✅')

  //     ||   C O O L D O W N S   ||
  if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Collection());
  }
  
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 3000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 3000;
      return message.channel.send(new MessageEmbed()
      .setDescription(`**❌ Please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${command.name}\` command!**`)
      .addField("why delay","Because that's the only way how I can prevent you from abusing(spamming) me!", true)
      .setColor('#ff0000'))
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
  //     ||    E X E C U T E   ||
  try {
    command.run(client, message, args);  
  } catch (error) {
    console.error(error);
    return message.channel.send("**❌ There was some problem executing that command!**").catch(console.error);
  }  
  

  // mute system //////
  const Schema = require('../utils/models/mute');

  client.on('guildMemberAdd', async (member) => {
    const data = await Schema.findOne({ Guild: member.guild.id });
    if (!data) return;
    const user = data.Users.findIndex((prop) => prop === member.id)
    if (user === -1) return;

    const role = member.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    )
    member.roles.add(role.id)
  })

  // booster event
  const boos = require('../utils/models/boost');
  boos.findOne({ guild: message.guild.id }, async (err, data) => {
    if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION') {
      let ch = message.guild.channels.cache.get(data.channel)
      ch.send(`Thank you ${message.author}, for becoming a Nitro Booster! You have unlocked:\n\n
            1) Acess Our Heart You .. Hehe
            2) Access to external emojis
            3) Access to change your nickname
            4) Access to the Nitro Booster role`)
    }
  });
  
  
  






  // mod logs

  const modlogsSchema = require("../utils/models/mod-log")
  client.modlogs = async function ({ Member, Action, Color, Reason }, message) {
    const data = await modlogsSchema.findOne({ Guild: message.guild.id })
    if (!data) return;
    const channel = message.guild.channels.cache.get(data.Channel)

    const logsEmbed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`Reason :${Reason || "No reason"}`)
      .addField('Member', `${Member.user.tag} (${Member.id})`)
      .setTitle(`Action took: ${Action}`)

    channel.send(logsEmbed)
  }

  
  
})