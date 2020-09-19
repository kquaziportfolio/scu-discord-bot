const request = require(`request`)
const config = require('../config.json');
const { MessageEmbed } = require(`discord.js`);

module.exports = {
	name: 'aqi', //project adapted from https://github.com/ShadeBot/ShadeBot-Discord-Bot/blob/master/commands/weather.js
    description: 'Get the Air Quality Index (AQI) for your city!',
    args: true,
    usage: `[city name]`,
	async execute(message, args) {
        message.delete(); 
      
        try {
            let cityName = args.join("%20");
            let baseURL = `https://api.weatherbit.io/v2.0/current/airquality?city=${cityName},US&key=fef1625e5fee4203b47ecd7c47870d5d`
            request(`${baseURL}`, (error, response, body) => {
                const json = JSON.parse(body);
    
                let result = "[SUBJECT TO CHANGE]";
                let level = "[SUBJECT TO CHANGE]";
    
                if (json.data[0].aqi < 50) {
                    result = ":white_check_mark: Air quality is considered satisfactory, and air pollution poses little to no risk.";
                    level = "Good";
                } else if (json.data[0].aqi >= 51 && json.data[0].aqi <= 100) {
                    result = "⚠️ Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusally sensitive to air pollution.";
                    level = "Moderate";
                } else if (json.data[0].aqi >= 101 && json.data[0].aqi <= 150) {
                    result = "⚠️ Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
                    level = "Unhealthy for Sensitive Groups";
                } else if (json.data[0].aqi >= 151 && json.data[0].aqi <= 200) {
                    result = ":x: Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
                    level = "Unhealthy";
                } else if (json.data[0].aqi >= 201 && json.data[0].aqi <= 300) {
                    result = ":x: Health alert: Everyone may experience more serious health problems";
                    level = "Very Unhealthy";
                } else {
                    result = ":x: Health warnings of emergency conditions. The entire population is more likely to be affected.";
                    level = "Hazardous";
                }
    
                let aqiEmbed = new MessageEmbed()
                    .setColor(config.school_color)
                    .setURL(`${baseURL}`)
                    .setTitle(`AQI Status for ${json.city_name}, ${json.state_code}, ${json.country_code}`)
                    .addField("AQI Levels for Health Concern", `${level} (${json.data[0].aqi})`)
                    .addField("Meaning", result)
                    .setFooter(`Referenced from the SciJinks website.`)
                    .setTimestamp();
    
                message.channel.send(aqiEmbed);
            });
        } catch(err) {
            message.channel.send({ embed: { description: `:x: City couldn't be found. Try again.`}});
            console.log(err);
        }
    }
}
