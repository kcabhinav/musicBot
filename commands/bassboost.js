const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-player');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('bassboost')
		.setDescription('Add bassboost filter.'),
	async execute(interaction, client, player) {
        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "No music is being played!" });
        await queue.setFilters({
            bassboost: !queue.getFiltersEnabled().includes("bassboost"),
            normalizer2: !queue.getFiltersEnabled().includes("bassboost") // because we need to toggle it with bass
        });

        return void interaction.followUp({ content: `Bassboost ${queue.getFiltersEnabled().includes("bassboost") ? "Enabled" : "Disabled"}!` });
	},
};