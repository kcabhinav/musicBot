const { SlashCommandBuilder } = require('@discordjs/builders');
const figlet = require('figlet');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascii')
		.setDescription('ASCII text design.')
        .addStringOption(option =>{
            return option.setName('text')
                    .setDescription("Track searched by user")
                    .setRequired(true);
        }),
	async execute(interaction, client, player) {
        
        await interaction.deferReply();
        const rendered = await figlet.textSync(interaction.options.get('text').value, {font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true});

        return void interaction.followUp({ content:"```" + rendered + "```" });
	},
};