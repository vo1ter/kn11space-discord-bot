const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const moment = require('moment')
moment.locale("uk")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Інформація про сервер'),
	async execute(interaction) {
		var server = interaction.guild
        var channelsSum
        var afkChannel
        var owner

        await interaction.user.fetch(server.ownerId)
            .then(user => owner = user);

        await server.channels.fetch()
            .then(channels => channelsSum = channels.size);

        if(server.afkChannel == null || server.afkChannel == undefined) {
            afkChannel = "відсутній"
        }
        else {
            afkChannel = server.afkChannel
        }

        if(server.systemChannel == null || server.systemChannel == undefined) {
            systemChannel = "відсутній"
        }
        else {
            systemChannel = server.systemChannel
        }

        if(server.rulesChannel == null || server.rulesChannel == undefined) {
            rulesChannel = "відсутній"
        }
        else {
            rulesChannel = server.rulesChannel
        }

        if(server.newsChannel == null || server.newsChannel == undefined) {
            newsChannel = "відсутній"
        }
        else {
            newsChannel = server.newsChannel
        }

        const serverInfoEmbed = new MessageEmbed()
            .setColor(`#ff1414`)
            .setTitle(`Інформація про сервер "${server.name}"`)
            .addFields(
                { name: "Загальна інформація", value: `Назва серверу: ${server.name}\nДата створення сервера: ${moment.utc(server.createdTimestamp).format("DD/MM/YYYY")}\nNitro бустів: ${server.premiumSubscriptionCount}` },
                { name: "Учасники", value: `\nК-ість учасників: ${server.memberCount}\nВласник сервера: ${owner.username}#${owner.discriminator}` },
                { name: "Канали", value: `\nК-ість каналів: ${channelsSum}\nAFK канал: ${afkChannel}\nКанал з правилами: ${rulesChannel}\nКанал з новинами: ${newsChannel}\nСистемний канал: ${systemChannel}` }
            )
            .setTimestamp()
            .setFooter({ text: "КН-11.info project", iconURL: "https://kn11.space/favicon.png" })
        await interaction.reply({ embeds: [serverInfoEmbed] });
	},
};