const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, devGuildId, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// gets commands to delete from commandToDelete folder
// const commandsToDelete = [];
// const commandsPathToDelete = path.join(__dirname, 'commandsToDelete');
// const commandFilesToDelete = fs.readdirSync(commandsPathToDelete).filter(file => file.endsWith('.js'));

// for (const fileToDelete of commandFilesToDelete) {
// 	const filePathToDelete = path.join(commandsPathToDelete, fileToDelete);
// 	const commandToDelete = require(filePathToDelete);
// 	commandsToDelete.push(commandToDelete.data.toJSON());
// }

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, devGuildId),
			{ body: commands },
		);

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		// deletes slash commands from commandsToDelete folder
		// await rest.get(Routes.applicationCommands(clientId))
		// 	.then(data => {
		// 		const promises = [];
		// 		for (const commandsToDelete of data) {
		// 			const deleteUrl = `${Routes.applicationCommands(clientId)}/${commandsToDelete.id}`;
		// 			promises.push(rest.delete(deleteUrl));
		// 		}
		// 		return Promise.all(promises);
		// 	});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();