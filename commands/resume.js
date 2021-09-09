const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-player');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume paused song.'),
	async execute(interaction, client, player) {
        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "No music is being played!" });
        const paused = queue.setPaused(false);
        return void interaction.followUp({ content: !paused ? "Something went wrong!" : "Song resumed!" });
	},
};