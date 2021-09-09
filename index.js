//const dotenv = require('dotenv');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const { Player } = require("discord-player");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const player = new Player(client);
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`Now playing **${track.title}**!`));

player.on("error", (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});
player.on("connectionError", (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});


player.on("botDisconnect", (queue) => {
    queue.metadata.channel.send("I was manually disconnected from the voice channel, clearing queue!");
});

player.on("channelEmpty", (queue) => {
    queue.metadata.channel.send("Nobody is in the voice channel, leaving...");
});

player.on("queueEnd", (queue) => {
    queue.metadata.channel.send("Queue finished!");
});

client.commands = new Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log("Vaibot is online");
	client.user.setActivity('/play', {type: 'LISTENING'})
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	

	if (!command) return;

	try {
		await command.execute(interaction, client, player);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);