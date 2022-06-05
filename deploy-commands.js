const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, devGuildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('ts').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('ys').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('gdz').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('rings').setDescription('Replies with user info!')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, devGuildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);  