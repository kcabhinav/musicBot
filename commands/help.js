const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton } = require('discord.js');
const paginationEmbed = require('discordjs-button-pagination')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List of commands.'),
	async execute(interaction, client, player) {
        //await interaction.deferReply();
        const musicCommands = new MessageEmbed()
                        .setTitle("Music")
                        .setDescription("Music commands.")
                        .addFields({ name: '/play', value: 'Play a song.', inline: true },
                                    { name: '/stop', value: 'Stop playing.', inline: true }, 
                                    { name: '/back', value: 'Go back to previous song.', inline: true },
                                    { name: '/loop', value: 'Loop current song.', inline: true },
                                    { name: '/np', value: 'Now Playing.', inline: true },
                                    { name: '/leave', value: 'Leave voice channel.', inline: true },
                                    { name: '/queue', value: 'Show song queue.', inline: true },
                                    { name: '/pause', value: 'Pause player.', inline: true },
                                    { name: '/resume', value: 'Resume paused song', inline: true },
                                    { name: '/seek', value: 'Seek to a timestamp.', inline: true },
                                    { name: '/skip', value: 'Skip current song.', inline: true },
                                    { name: '/bassboost', value: 'Enable bassboost filter.', inline: true }
                                    )
        const funCommands = new MessageEmbed()
                        .setTitle("Fun")
                        .setDescription("Fun commands.")
                        .addFields(
                            { name: '/ascii', value: 'Ascii text design.', inline: true },
                            { name: '/fact', value: 'Random fact.', inline: true },
                            { name: '/flip', value: 'Flip a coin.', inline: true },
                            { name: '/joke', value: 'Random joke.', inline: true },  
                        )
        
        const generalCommands = new MessageEmbed()
                        .setTitle("General")
                        .setDescription("General commands.")
                        .addFields(
                            { name: '/ping', value: 'Pong', inline: true },
                            { name: '/user', value: 'User info', inline: true },
                            { name: '/server', value: 'Server info', inline: true },
                            { name: '/help', value: 'Eh...', inline: true }
                        )
        

        const embeds = [
            musicCommands, generalCommands, funCommands
        ]

        const button1 = new MessageButton()
            .setCustomId("previousbtn")
            .setLabel("Previous")
            .setStyle("DANGER");

        const button2 = new MessageButton()
            .setCustomId("nextbtn")
            .setLabel("Next")
            .setStyle("SUCCESS");
        const pages = [musicCommands, generalCommands, funCommands];
        const buttons = [button1, button2];
        const timeout = 180000;
        paginationEmbed(interaction, pages, buttons, timeout)
        return void null;

	},
};