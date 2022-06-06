const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "65.108.50.222",
    user: "kn11",
    password: "BjAibYt87fXEf2KH",
    database: "kn11"
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rings')
		.setDescription('Список дзвінків.'),
	async execute(interaction) {
        const ringsEmbed = new MessageEmbed()
            .setColor(`#ff1414`)
            .addFields(
                { name: "Розклад дзвінків", value: "1: 8:30 / 9:50\n2: 10:00 / 11:20 \n3: 11:45 / 13:05 \n4: 13:30 / 14:50 \n5: 15:00 / 16:20 \n6: 16:40 / 18:00" },
                { name: "Розклад дзвінків (скорочений)", value: "1: 8:30 / 9:30\n2: 9:40 / 10:40 \n3: 11:00 / 12:00 \n4: 12:20 / 13:20 \n5: 13:30 / 14:30 \n6: 14:40 / 15:40" },
            )
            .setTimestamp()
            .setFooter({ text: "КН-11.info project", iconURL: "https://kn11.space/favicon.png" })
        await interaction.reply({ embeds: [ringsEmbed] });
	},
};