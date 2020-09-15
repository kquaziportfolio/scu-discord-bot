const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');
let isAdmin = require("../modules/isAdmin.js");
let sendMessage = require(`../google-form-functions/sendMessage.js`);

module.exports = { 
    name: 'other-discords',
    description: 'For outputting other Discord server embeds!',  
    usage: `${config.prefix}other-discords [title] | [description] | [image url]`,
    guildOnly: true,
    async execute(message, args) {
        message.delete();

        if (isAdmin(message.author, message)) {

            const discordInstructions = new MessageEmbed()
            .setColor(config.school_color)
            .addField("Here's an example:", `${config.prefix}other-discords General SCU Server | [Join!](https://discord.gg/YusWdfu) | https://jasonanhvu.github.io/assets/img/logo-pic.png`)
            .setTimestamp();

            const prompt = args.join(' ').split('|');
            if(!prompt[2]) await message.channel.send(discordInstructions);
                    
            sendMessage(client, config.channels.promos, {embed : {color: config.school_color, title: `${prompt[0]}`, description: `${prompt[1]}`, thumbnail: {url: `${prompt[2]}`}}});

            if(prompt[2]) {
                sendMessage(client, config.channels.auditlogs, { embed: { title: `__**Discord Promo Created!**__`, description: `<@${message.author.id}> just created a Discord server promo!`}})
            }
        }
    }
}