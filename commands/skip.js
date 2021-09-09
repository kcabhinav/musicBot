const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-player');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip current song.'),
	async execute(interaction, client, player) {
        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "No music is being played!" });
        const currentTrack = queue.current;
        const success = queue.skip();
        return void interaction.followUp({
            content: success ? `Skipped **${currentTrack}**!` : "Something went wrong!"
        });
        
	},
};