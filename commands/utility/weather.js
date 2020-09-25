const request = require(`request`)
const toTitleCase = require(`to-title-case`);
const moment = require('moment'); //here is a change in the file
const { MessageEmbed } = require(`discord.js`);

module.exports = {
	name: 'weather', //project adapted from https://github.com/ShadeBot/ShadeBot-Discord-Bot/blob/master/commands/weather.js
    description: 'Get your daily weather statistics here depending on your zip code!',
    args: true,
    usage: `[zip code, country abbreviation]`,
    category: 'utility',
	async execute(client, message, args) {
        message.delete(); 
      
        let zipCode = args[0];
        request(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${client.config.api.weather}`, (error, response, body) => {
            const json = JSON.parse(body);

            if (json.cod && json.cod == 404) return message.channel.send({embed: {description: "Zip code not found!", color: client.config.school_color}})
            
            if (json.wind.deg) {
                let angle = json.wind.deg
                if (json.wind.deg <= 22.5) angle = "North";
                else if (json.wind.deg <= 67.5) angle = "Northeast";
                else if (json.wind.deg <= 112.5) angle = "East";
                else if (json.wind.deg <= 157.5) angle = "Southeast";
                else if (json.wind.deg <= 202.5) angle = "South";
                else if (json.wind.deg <= 247.5) angle = "Southwest";
                else if (json.wind.deg <= 292.5) angle = "West";
                else if (json.wind.deg <= 337.5) angle = "Northwest";
                else if (json.wind.deg <= 360.1) angle = "North";

                json.wind.speed += `m/s ${angle}`;
            } 
            else json.wind.speed += "m/s";

            let weatherEmbed = new MessageEmbed()
                .setColor(client.config.school_color)
                .setTitle(`:flag_${json.sys.country.toLowerCase()}: ${json.name}, ${json.sys.country}`)
                .setURL(`https://openweathermap.org/city/${json.id}`)
                .setThumbnail(`https://openweathermap.org/img/w/${json.weather[0].icon}.png`)
                .addField(`Temperature`, `Main: ${Math.round((json.main.temp - 273.15) * 9/5 + 32)}°F\n Feels Like: ${Math.round((json.main.feels_like - 273.15) * 9/5 + 32)}°F\n (Min: ${Math.round((json.main.temp_min - 273.15) * 9/5 + 32)}°F | Max: ${Math.round((json.main.temp_max - 273.15) * 9/5 + 32)}°F )`, true)
                .addField('Weather', toTitleCase(`${json.weather[0].description}`), true)
                .addField(`Wind`, `${json.wind.speed}`, true)
                .addField(`Humidity`,`${json.main.humidity}%`, true)
                .addField(`Pressure`, `${json.main.pressure} hpa`, true)
                .addField('Cloudiness', `${json.clouds.all}%`, true)
                .addField('Latitude', `${json.coord.lat}`, true)
                .addField('Longitude', `${json.coord.lon}`, true)
                .addField(`\u200B`, `\u200B`, true)
                .addField(`Sunrise`, moment.unix(json.sys.sunrise).format('MM-DD-YYYY, (h:mm A) '), true)
                .addField(`Sunset`, moment.unix(json.sys.sunset).format('MM-DD-YYYY, (h:mm A) '), true)
                .setFooter(`Created by the server lords!`)
                .setTimestamp();

            message.channel.send(weatherEmbed);
        });
    }
}
