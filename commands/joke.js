const { SlashCommandBuilder } = require('@discordjs/builders');
const DadJokes = require('dadjokes-wrapper');
const dj = new DadJokes();
const cowsay = require('cowsay');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Random dad joke.'),
	async execute(interaction, client, player) {
        
        await interaction.deferReply();

        return void dj.randomJoke()
                .then(res => interaction.followUp({
                    embeds: [
                        {
                            description: res,
                        }
                    ]
                }))
                .catch(err => console.error(err));
	},
};