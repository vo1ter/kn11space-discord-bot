const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js")
const moment = require('moment')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mod')
		.setDescription('Модераторські дії над користувачами.')
        .addUserOption(option => option.setName('name').setDescription('Над яким користувачем вершимо правосуддя?').setRequired(true)),
	async execute(interaction) {
        if(interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) == false || interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) == null) {
            interaction.reply({ content: "У вас немає прав для винокання цієї команди!", ephemeral: true })
            return
        }
        const user = interaction.options.getUser('name');
        var userKickPerm
        var muteRole = interaction.guild.roles.cache.find((role) => role.name == "Muted")
        var isUserMuted
        
        await interaction.guild.members.fetch(interaction.options.getUser('name').id).then((user) => userKickPerm = user.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
        
        const successfullEmbed = new MessageEmbed()
            .setColor(`#32a832`)
            .setTitle(`Маніпулювання із ${user.username}#${user.discriminator}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: `Виконання дії`, value: `Дію над ${user.username}#${user.discriminator} виконано успішно!` },
            )
            .setTimestamp()
            .setFooter({ text: "КН-11.info project", iconURL: "https://kn11.space/favicon.png" });
        
        if(interaction.member.id == user.id) {
            await interaction.reply({ content: "Ви не можете маніпулювати із самим собою!", ephemeral: true})
            return
        }
        else if(user.id == "887450659153121310") {
            await interaction.reply({ content: "Ви не можете маніпулювати зі мною!", ephemeral: true})
            return
        }
        else if(userKickPerm == true) {
            await interaction.reply({ content: "Ви не можете маніпулювати із користувачем, який може кікати!", ephemeral: true})
            return
        }
        await interaction.guild.members.fetch(user).then(user => joinedTimestamp = user.joinedTimestamp)

        const buttonsRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
					.setCustomId('mute')
					.setLabel('Мут')
					.setStyle('DANGER'),
                new MessageButton()
					.setCustomId('kick')
					.setLabel('Кік')
					.setStyle('DANGER'),
                new MessageButton()
					.setCustomId('ban')
					.setLabel('Бан')
					.setStyle('DANGER'),
                new MessageButton()
					.setCustomId('exit')
					.setLabel('Назад')
					.setStyle('PRIMARY'),
            )

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });
        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                if(i.customId == "kick") {
                    await interaction.guild.members.fetch(user).then(user => user.kick(`Кікнуто користувачем ${i.user.username}#${i.user.discriminator}.`))
                    await i.update({ embeds: [successfullEmbed], components: [] })
                    setTimeout(() => {
                        collector.stop()
                    }, 5000)
                }
                else if(i.customId == "ban") {
                    await interaction.guild.members.fetch(user).then(user => user.ban({ reason: `Забанено користувачем ${i.user.username}#${i.user.discriminator}.` }))
                    await i.update({ embeds: [successfullEmbed], components: [] })
                    setTimeout(() => {
                        collector.stop()
                    }, 5000)
                }
                else if(i.customId == "mute") {
                    if(muteRole == null) {
                        interaction.guild.roles.create({ name: "Muted", color: "#545454", mentionable: false, permissions: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK, Permissions.FLAGS.STREAM] })
                    }
                    await interaction.guild.members.fetch(user).then((user) => { isUserMuted = user.roles.cache.find(r => r.name === "Muted") })
                    if(isUserMuted == undefined || isUserMuted == null) {
                        await interaction.guild.members.fetch(user).then((user) => { user.roles.add(muteRole) })
                        await i.update({ embeds: [successfullEmbed], components: [] })
                    }
                    else {
                        await i.update({ content: "Ви не можете замутити цього користувача, бо він вже в муті!", embeds: [], components: [] })
                    }
                    setTimeout(() => {
                        collector.stop()
                    }, 5000)
                }
                else {
                    collector.stop();
                }
            }
            else {
                i.reply({ content: `Ти не можеш взаємодіяти із цими кнопками!`, ephemeral: true });
            }
        });

        collector.on('end', collected => {
            interaction.deleteReply()
            return
        });

        const modEmbed = new MessageEmbed()
            .setColor(`#ff1414`)
            .setTitle(`Маніпулювання із ${user.username}#${user.discriminator}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: `Інформація про користувача`, value: `Дата реєстрації: ${moment.utc(user.createdTimestamp).format("DD/MM/YYYY")}\nДата приєднання до сервера: ${moment.utc(joinedTimestamp).format("DD/MM/YYYY")}\n` },
            )
            .setTimestamp()
            .setFooter({ text: "КН-11.info project", iconURL: "https://kn11.space/favicon.png" });
        await interaction.reply({ embeds: [modEmbed], ephemeral: false, components: [buttonsRow] });
	},
};