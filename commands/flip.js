const { SlashCommandBuilder } = require('@discordjs/builders');
const delay = ms => new Promise(res => setTimeout(res, ms));



module.exports = {
	data: new SlashCommandBuilder()
		.setName('flip')
		.setDescription('Flip a coin.'),
	async execute(interaction, client, player) {
        
        await interaction.deferReply();
        const isHeads = Math.random() > 0.5;
        interaction.followUp({content: "*Tosses a coin.*"});
        await delay(2500);
        return void interaction.followUp({ content: isHeads ? "*Lands a head.*" : "*Lands a tail.*" });
	},
};