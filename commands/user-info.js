const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const moment = require('moment')
moment.locale("uk")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Інформація про користувача.')
        .addUserOption(option => option.setName('name').setDescription('Про якого користувача дивимося інформацію?').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('name')
        var joinedTimestamp

        await interaction.guild.members.fetch(user).then(user => joinedTimestamp = user.joinedTimestamp)

        const serverInfoEmbed = new MessageEmbed()
            .setColor(`#ff1414`)
            .setTitle(`Інформація про користувача ${user.username}#${user.discriminator}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: `Загальна інформація`, value: `Ім\'я: ${user.username}\nДискримінатор: ${user.discriminator}\nПовний тег: ${user.username}#${user.discriminator}\nID: ${user.id}\nДата реєстрації: ${moment.utc(user.createdTimestamp).format("DD/MM/YYYY")}\nДата приєднання до сервера: ${moment.utc(joinedTimestamp).format("DD/MM/YYYY")}\n` },
            )
            .setTimestamp()
            .setFooter({ text: "КН-11.info project", iconURL: "https://kn11.space/favicon.png" });
        await interaction.reply({ embeds: [serverInfoEmbed] });
	},
};