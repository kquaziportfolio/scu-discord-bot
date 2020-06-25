const { Client, MessageEmbed } = require(`discord.js`);
const client = new Client({partials: ['MESSAGE']});

module.exports = async (message) => {
    if(!message.partial) {
        const channel = client.channels.cache.get('725775198862835853');
        if(channel) {
            const embed = new MessageEmbed()
                .setTitle('__**Deleted Message**__')
                .addField('Author', `${message.author.tag} (${message.author.id})`, true)
                .addField('Channel', `${message.channel.name} (${message.channel.id})`, true)
                .setDescription(message.content)
                .setTimestamp()
                .setColor(10231598)
            channel.send(embed);
        }
    }
}