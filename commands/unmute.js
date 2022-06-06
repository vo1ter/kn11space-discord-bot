const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require("discord.js")
const moment = require('moment')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Анмут користувача.')
        .addUserOption(option => option.setName('name').setDescription('Якого користувача розмучуємо?').setRequired(true)),
	async execute(interaction) {
        if(interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) == false || interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) == null) {
            interaction.reply({ content: "У вас немає прав для винокання цієї команди!", ephemeral: true })
            return
        }
        const user = interaction.options.getUser('name');
        var userKickPerm
        var muteRole = interaction.guild.roles.cache.find((role) => role.name == "Muted")
        var isUserMuted
        
        await interaction.guild.members.fetch(user).then((user) => { isUserMuted = user.roles.cache.find(r => r.name === "Muted") })
        await interaction.guild.members.fetch(interaction.options.getUser('name').id).then((user) => userKickPerm = user.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
        
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

        if(isUserMuted == undefined || isUserMuted == null) {
            await interaction.reply({ content: "Ви не можете розмутити цього користувача, бо він не в муті!", ephemeral: true })
        }
        else {
            await interaction.guild.members.fetch(user).then((user) => { user.roles.remove(muteRole) })
            await interaction.reply({ content: "Користувача успішно розмучено!", ephemeral: true });
        }
	},
};