const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-player');
const { ms, s, m, h, d } = require('time-convert')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('back')
		.setDescription('Go back to previous song.'),
	async execute(interaction, client, player) {
        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "No music is being played!" });
        if(!queue.previousTracks[0]) return void interaction.followUp({content: "No previous song."});
        await queue.back();
        return void interaction.followUp({content: "Moving back to previous song!"});
	},
};