const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require(`node-fetch`);
const BASE_URL = "https://api.covid19api.com/summary";

module.exports = {
    name: 'covid19', //forked from Raptor SA
    description: 'coronavirus tracker api command', //here is a change in the file
        async execute (message, args) {
            let global = await fetch(BASE_URL);
            let data = await global.json();

            const date = new Date();
            const targetDate = date.toLocaleString();

            const COVID_EMBED = new Discord.MessageEmbed()
            COVID_EMBED.setTitle(`__**Global COVID-19 Status Tracker:**__`)
            COVID_EMBED.setDescription(`This data builds on other agency efforts – such as CDC's new weekly COVID-19 Surveillance report, COVIDView – to capture the impact the virus is having on the United States.`)
            COVID_EMBED.addField(`Newly Confirmed Cases: `, data.Global.NewConfirmed, true)
            COVID_EMBED.addField(`Total Confirmed Cases: `, data.Global.TotalConfirmed, true)
            COVID_EMBED.addField(`New Deaths: `, data.Global.NewDeaths, true)
            COVID_EMBED.addField(`Total Deaths: `, data.Global.TotalDeaths, true)
            COVID_EMBED.addField(`Newly Recovered Cases: `, data.Global.NewRecovered, true)
            COVID_EMBED.addField(`Total Recovered Cases: `, data.Global.TotalRecovered, true)
            COVID_EMBED.setFooter(`Brought to you by the server lords on ${targetDate}`)
            COVID_EMBED.setTimestamp()
            COVID_EMBED.setColor(10231598)
            
            message.channel.send(COVID_EMBED).catch(err => `Error: ${err}`)

        }
}