const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.login(process.env.TOKEN);

client.on('message', message => {
	if (message.author.bot) return;

	if (message.channel.type == 'dm') return;

	if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase()))
		return;

	const args = message.content
		.trim()
		.slice(config.prefix.length)
		.split(/ +/g);

	//	if (!args[0]) return;

	const command = args.shift().toLowerCase();

	try {
		const commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args);
	} catch (err) {
		
	console.error('Erro:' + err);
	}
});

client.on('message', message => { 
    if(message.channel.name == 'chat-global' && !message.author.bot){
      client.guilds.cache.forEach(guild=>{
        if(guild == message.guild) return;
        let channel = guild.channels.cache.find(ch=>ch.name === 'chat-global');
        if(!channel) return;
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag +" ", message.author.displayAvatarURL())
        .setColor("#00c1ff")
        .setDescription(message.content)
        .setFooter(message.guild.name, (message.guild.iconURL({ dynamic: true })))
        .setTimestamp()
        channel.send(embed)
      })
    }
   })
