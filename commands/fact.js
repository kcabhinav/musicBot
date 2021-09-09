const { SlashCommandBuilder } = require('@discordjs/builders');
const rf = require('random-facts');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('fact')
		.setDescription('Random fact.'),
	async execute(interaction, client, player) {
        
        await interaction.deferReply();

        return void interaction.followUp({
                    embeds: [
                        {
                            title: "Fact",
                            description: rf.randomFact(),
                        }
                    ]
                })
	},
};