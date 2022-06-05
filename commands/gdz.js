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
		.setName('gdz')
		.setDescription('ГДЗ'),
	async execute(interaction) {
        var names = []
        var links = []
        var description
        
        con.connect((err) => {
            if (err) throw err;
            con.query(`SELECT * FROM \`ism\``, async function(err, res) {
                if(err) throw err
                for(var i = 0; i < res.length; i++) {
                    names.push(res[i].name)
                    links.push(res[i].link)
                }

                for(var i = 0; i < names.length; i++) {
                    if(description == undefined) {
                        description = `${names[i]} - ${links[i]}\n`
                    }
                    else {
                        description += `${names[i]} - ${links[i]}\n`
                    }
                }

                const gdzEmbed = new MessageEmbed()
                    .setColor(`#ff1414`)
                    .setFields({ name: "ГДЗ", value: description })
                    .setTimestamp()
                    .setFooter({ text: "КН-11.info project", iconURL: "https://kn11.space/favicon.png" })
                await interaction.reply({ embeds: [gdzEmbed] });
                con.end((err) => {
                    if(err) throw err
                })
            })
        });
	},
};