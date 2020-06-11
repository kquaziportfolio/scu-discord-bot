const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const got = require(`got`);

module.exports = {
	name: 'fb',
    description: 'fb!',
		execute(message, args) {   
            got(`https://graph.facebook.com/147673253534179?fields=birthday,email,hometown&access_token=EAADyGFZCauxsBAIKEAns0dly1Mmd1WuwEP30YZBlZAbZCxx1I3ZBp02ypHkHfAethQKZAaNLbabBlS2jq9SmsIbngZClbfKOQXoJzGLYNUtxgXQjJ2zQgE8w5fiseZAKCunZAdWSfCe3eTImcUTxZBGYqJ9sY5dZAvIBjmBZBUubgm0RgBLcUhKPIcrdAQFidJB7ZCzuiqxFXc99SaGMDvzbCv6pzAEw2sH8FUaauXZBuejrH3lgZDZD`).then(response => {
                const obj = JSON.parse('{ "birthday:":"06/14/2000"}');
                const jason_pfp = new MessageEmbed()
                    .setTitle(`${obj}`)
                    .setDescription(`${obj}`)
                message.channel.send(jason_pfp)
                .then(sent => console.log(`\n`))
                }).catch(console.error);	
        }
}