const { MessageEmbed } = require('discord.js');
const fetch = require(`node-fetch`);
const { prefix, school_color } = require('../config.json');

module.exports = {
    name: 'covid19', //forked from Raptor SA
    description: 'Get daily and instant COVID-19 data here!', //here is a change in the file
    usage: `${prefix}covid19 global __**OR**__ ${prefix}covid19 [state abbreviation] __**OR**__ ${prefix}covid19 county`,
    guildOnly: false,
        async execute (message, args) {
            message.delete();

            let state = message.content.toLowerCase().split(" ")[1];
            
            const BASE_URLS = ["https://api.covid19api.com/summary", `https://covidtracking.com/api/v1/states/${state}/current.json`, `https://covid19-us-api.herokuapp.com/county`];
            let global = await fetch(BASE_URLS[0]);
            let data = await global.json();
  
            let global2 = await fetch(BASE_URLS[1]);
            let data2 = await global2.json();

            let global3 = await fetch(BASE_URLS[2]);
            let data3 = await global3.json();

            const date = new Date();
            const targetDate = date.toLocaleString();

            const COVID_EMBED1 = new MessageEmbed()
            COVID_EMBED1.setTitle(`__**Global COVID-19 Status Tracker:**__`)
            COVID_EMBED1.setDescription(`This data builds on other agency efforts – such as CDC's new weekly COVID-19 Surveillance report, COVIDView – to capture the impact the virus is having on the United States.`)
            COVID_EMBED1.addField(`Newly Confirmed Cases: `, data.Global.NewConfirmed, true)
            COVID_EMBED1.addField(`Total Confirmed Cases: `, data.Global.TotalConfirmed, true)
            COVID_EMBED1.addField(`New Deaths: `, data.Global.NewDeaths, true)
            COVID_EMBED1.addField(`Total Deaths: `, data.Global.TotalDeaths, true)
            COVID_EMBED1.addField(`Newly Recovered Cases: `, data.Global.NewRecovered, true)
            COVID_EMBED1.addField(`Total Recovered Cases: `, data.Global.TotalRecovered, true)
            COVID_EMBED1.setFooter(`Brought to you by the server lords on ${targetDate}`)
            COVID_EMBED1.setTimestamp()
            COVID_EMBED1.attachFiles(`./assets/covid-19.jpg`)
            COVID_EMBED1.setImage(`attachment://covid-19.jpg`)
            COVID_EMBED1.setColor(school_color)

            const COVID_EMBED2 = new MessageEmbed()
            COVID_EMBED2.setTitle(`__**USA COVID-19 Status Tracker by State:**__`)
            COVID_EMBED2.setDescription(`Here is ${data2.state}'s data as of today.`)
            COVID_EMBED2.addField(`State: `, data2.state, true)
            COVID_EMBED2.addField(`Positive Cases: `, data2.positive, true)
            COVID_EMBED2.addField(`Negative Cases: `, data2.negative, true)
            COVID_EMBED2.addField(`Currently Hospitalized: `, data2.hospitalizedCurrently, true)
            COVID_EMBED2.addField(`In ICU Currently: `, data2.inIcuCurrently, true)
            COVID_EMBED2.addField(`On Ventilator Currently`, data2.onVentilatorCurrently, true)
            COVID_EMBED2.addField(`Recovered: `, data2.recovered, true)
            COVID_EMBED2.addField(`Deaths: `, data2.death, true)
            COVID_EMBED2.addField(`Hospitalized: `, data2.hospitalized, true)
            COVID_EMBED2.addField(`Total Viral Tests: `, data2.totalTestsViral, true)
            COVID_EMBED2.addField(`Positive Viral Cases: `, data2.positiveCasesViral, true)
            COVID_EMBED2.addField(`Positive Increase in Cases: `, data2.positiveIncrease, true)
            COVID_EMBED2.addField(`Negative Increase in Cases: `, data2.negativeIncrease, true)
            COVID_EMBED2.addField(`Total Amount of Cases: `, data2.total, true)
            COVID_EMBED2.addField(`Total Viral Test Results: `, data2.totalTestResults, true)
            COVID_EMBED2.addField(`Total Test Results Increase: `, data2.totalTestResultsIncrease, true)
            COVID_EMBED2.addField(`Death Increase: `, data2.deathIncrease, true)
            COVID_EMBED2.addField(`Hospitalized Increase: `, data2.hospitalizedIncrease, true)
            COVID_EMBED2.setFooter(`Brought to you by the server lords on ${targetDate}`)
            COVID_EMBED2.setTimestamp()
            COVID_EMBED2.setColor(school_color)

            const COVID_EMBED3 = new MessageEmbed() 
            COVID_EMBED3.setTitle(`__**Santa Clara County, CA's COVID-19 Status Tracker**__`)
            COVID_EMBED3.setDescription(`Here is ${data3.message[9].county_name} County, ${data3.message[9].state_name}'s data as of today.`)
            COVID_EMBED3.addField(`Confirmed Cases: `, data3.message[9].confirmed, true)
            COVID_EMBED3.addField(`New Cases: `, data3.message[9].new, true)
            COVID_EMBED3.addField(`Death Cases: `, data3.message[9].death, true)
            COVID_EMBED3.addField(`New Deaths: `, data3.message[9].new_death, true)
            COVID_EMBED3.addField(`Fatality Rate: `, data3.message[9].fatality_rate, true)
            COVID_EMBED3.addField(`\u200B`, `\u200B`, true)
            COVID_EMBED3.setFooter(`Brought to you by the server lords on ${targetDate}`)
            COVID_EMBED3.setColor(school_color)
            
            if (args[0] === "global") return message.channel.send(COVID_EMBED1).catch(err => `Error: ${err}`)
            if (args[0].length >= 2) { 
                message.channel.send(COVID_EMBED2).catch(err => `Error: ${err}`)
            } else if (args[0].length < 2) {
                message.channel.send({embed: { description: "That was not a state abbreviation. Please try again!", color: 10231598}})
            }
            if (args[0] === "county") return message.channel.send(COVID_EMBED3).catch(err => `Error: ${err}`)
        }
}