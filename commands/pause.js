const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-player');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause current song.'),
	async execute(interaction, client, player) {
        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "No music is being played!" });
        const paused = queue.setPaused(true);
        return void interaction.followUp({ content: paused ? "Paused!" : "Something went wrong!" });
	},
};