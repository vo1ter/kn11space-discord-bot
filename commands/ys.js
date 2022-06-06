const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const mysql = require('mysql');
const moment = require('moment')

const con = mysql.createConnection({
    host: "65.108.50.222",
    user: "kn11",
    password: "BjAibYt87fXEf2KH",
    database: "kn11"
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ys')
		.setDescription('Розклад на наступний день.'),
	async execute(interaction) {
        var uaDay
        var enDay
        var subjects = []
        var cabinets = []

        if(moment().locale("uk").add("1", "d").format('dddd') == "субота" || moment().locale("uk").add("1", "d").format('dddd') == "неділя") {
            uaDay = "понеділок";
            enDay = "monday";
        }
        else {
            uaDay = moment().locale("uk").add("1", "d").format('dddd');
            enDay = moment().locale("en").add("1", "d").format('dddd').toLowerCase();
        }

        con.connect((err) => {
            if (err) throw err;
            con.query(`SELECT * FROM \`s_${enDay}\``, async function(err, res) {
                if(err) throw err
                for(var i = 0; i < res.length; i++) {
                    subjects.push(res[i].name)
                    cabinets.push(res[i].cabinet)
                }

                const yesterdayScheduleEmbed = new MessageEmbed()
                    .setColor(`#ff1414`)
                    .setTitle(`Розклад на ${uaDay}`)
                    .addFields(
                        { name: "Пара #1", value: `Предмет: ${subjects[0]}\nКабінет: ${cabinets[0]}` },
                        { name: "Пара #2", value: `Предмет: ${subjects[1]}\nКабінет: ${cabinets[1]}` },
                        { name: "Пара #3", value: `Предмет: ${subjects[2]}\nКабінет: ${cabinets[2]}` },
                        { name: "Пара #4", value: `Предмет: ${subjects[3]}\nКабінет: ${cabinets[3]}` },
                        { name: "Пара #5", value: `Предмет: ${subjects[4]}\nКабінет: ${cabinets[4]}` },
                        { name: "Пара #6", value: `Предмет: ${subjects[5]}\nКабінет: ${cabinets[5]}` },
                    )
                    .setTimestamp()
                    .setFooter({ text: "КН-11.info project", iconURL: "https://kn11.space/favicon.png" })
                await interaction.reply({ embeds: [yesterdayScheduleEmbed] });
                con.end((err) => {
                    if(err) throw err
                })
            })
        });
	},
};