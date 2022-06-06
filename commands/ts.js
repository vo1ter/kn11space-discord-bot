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
		.setName('ts')
		.setDescription('Розклад на сьогодні.'),
	async execute(interaction) {
        var uaDay
        var enDay
        var subjects = []
        var cabinets = []
        var kievTime = moment().utcOffset("+03:00").format("HH:mm")
        var nextSubjTime

        if(moment().locale("uk").format('dddd') == "субота" || moment().locale("uk").format('dddd') == "неділя") {
            uaDay = "понеділок";
            enDay = "monday";
        }
        else {
            uaDay = moment().locale("uk").format('dddd');
            enDay = moment().locale("en").format('dddd');
        }

        con.connect((err) => {
            if (err) throw err;
            con.query(`SELECT * FROM \`s_${enDay}\``, async function(err, res) {
                if(err) throw err
                for(var i = 0; i < res.length; i++) {
                    subjects.push(res[i].name)
                    cabinets.push(res[i].cabinet)
                }

                if(kievTime == "8:30") {
                    nextSubjTime = moment().locale("uk").to(moment("10:00", "HH:mm"))
                }
                else if(kievTime == "10:00") {
                    nextSubjTime = moment().locale("uk").to(moment("11:45", "HH:mm"))
                }
                else if(kievTime == "11:45") {
                    nextSubjTime = moment().locale("uk").to(moment("13:30", "HH:mm"))
                }
                else if(kievTime == "13:30") {
                    nextSubjTime = moment().locale("uk").to(moment("15:00", "HH:mm"))
                }
                else if(kievTime == "15:00") {
                    nextSubjTime = moment().locale("uk").to(moment("16:40", "HH:mm"))
                }
                else if(kievTime == "16:40") {
                    nextSubjTime = moment().locale("uk").to(moment("18:00", "HH:mm"))
                }
                else {
                    nextSubjTime = moment().locale("uk").to(moment("8:30", "HH:mm"))
                }

                const todayScheduleEmbed = new MessageEmbed()
                    .setColor(`#ff1414`)
                    .setTitle(`Розклад на ${uaDay}`)
                    .addFields(
                        { name: `Зараз ${kievTime}`, value: `Наступна пара почнеться ${nextSubjTime}` },
                        { name: "Пара #1", value: `Предмет: ${subjects[0]}\nКабінет: ${cabinets[0]}` },
                        { name: "Пара #2", value: `Предмет: ${subjects[1]}\nКабінет: ${cabinets[1]}` },
                        { name: "Пара #3", value: `Предмет: ${subjects[2]}\nКабінет: ${cabinets[2]}` },
                        { name: "Пара #4", value: `Предмет: ${subjects[3]}\nКабінет: ${cabinets[3]}` },
                        { name: "Пара #5", value: `Предмет: ${subjects[4]}\nКабінет: ${cabinets[4]}` },
                        { name: "Пара #6", value: `Предмет: ${subjects[5]}\nКабінет: ${cabinets[5]}` },
                    )
                    .setTimestamp()
                    .setFooter({ text: "КН-11.info project", iconURL: "https://kn11.space/favicon.png" })
                await interaction.reply({ embeds: [todayScheduleEmbed] });
                con.end((err) => {
                    if(err) throw err
                })
            })
        });
	},
};