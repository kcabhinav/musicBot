const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-player');
const { ms, s, m, h, d } = require('time-convert')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seek')
		.setDescription('Seek to a given time.')
        .addStringOption(option =>{
            return option.setName('seek')
                    .setDescription("Seek to a timestamp.")
                    .setRequired(true);
        }),
	async execute(interaction, client, player) {
        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "No music is being played!" });
        const time = interaction.options.get("seek").value.split(":");
        const milliseconds = ms.from(m, s)(Number(time[0]), Number(time[1]))
        queue.seek(milliseconds);
        return void interaction.followUp({ content: `Seeked to ${interaction.options.get("seek").value}` });
	},
};