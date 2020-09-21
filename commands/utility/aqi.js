const fetch = require(`node-fetch`);
const config = require('../../config.json');
const { MessageEmbed } = require(`discord.js`);

module.exports = {
	name: 'aqi', //project adapted from https://github.com/ShadeBot/ShadeBot-Discord-Bot/blob/master/commands/weather.js
    description: 'Get the Air Quality Index (AQI) for your city!',
    args: true,
    usage: `[city name, state abbreviation]`,
    category: 'Utility',
	async execute(message, args) {
        message.delete(); 
        
        let cityName = args.join("%20");
        let country = "US";
        const aqi = await fetch(`https://api.weatherbit.io/v2.0/current/airquality?city=${cityName},${country}&key=${config.api.aqi}`);
        const aqiResult = await aqi.json();
      
        try {
            let result = "[SUBJECT TO CHANGE]";
            let level = "[SUBJECT TO CHANGE]";

            if (aqiResult.data[0].aqi < 50) {
                result = ":white_check_mark: Air quality is considered satisfactory, and air pollution poses little to no risk.";
                level = "Good";
            } else if (aqiResult.data[0].aqi >= 51 && aqiResult.data[0].aqi <= 100) {
                result = "⚠️ Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
                level = "Moderate";
            } else if (aqiResult.data[0].aqi >= 101 && aqiResult.data[0].aqi <= 150) {
                result = "⚠️ Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
                level = "Unhealthy for Sensitive Groups";
            } else if (aqiResult.data[0].aqi >= 151 && aqiResult.data[0].aqi <= 200) {
                result = ":x: Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
                level = "Unhealthy";
            } else if (aqiResult.data[0].aqi >= 201 && aqiResult.data[0].aqi <= 300) {
                result = ":x: Health alert: Everyone may experience more serious health problems";
                level = "Very Unhealthy";
            } else {
                result = ":x: Health warnings of emergency conditions. The entire population is more likely to be affected.";
                level = "Hazardous";
            }

            let aqiEmbed = new MessageEmbed()
                .setColor(config.school_color)
                .setTitle(`AQI Status for ${aqiResult.city_name}, ${aqiResult.state_code}, ${aqiResult.country_code}`)
                .addField("Level for Health Concern", `${level} (${aqiResult.data[0].aqi})`)
                .addField("Meaning", result)
                .setFooter(`Referenced from the SciJinks website.`)
                .setTimestamp();

            message.channel.send(aqiEmbed);
        } catch(err) {
            console.error("Error: " + err);
            console.error("Response body: " + body);
            message.channel.send(body + " is not a city in " + aqiResult.country_code);
        }
    }
}