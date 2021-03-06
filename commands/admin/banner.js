const { MessageEmbed } = require(`discord.js`); //for embed functionality 

module.exports = {
    name: 'banner',
    description: 'Create a cool embed banner with images in my folder!',
    args: true,
    usage: `[file name and extension]`, 
    category: 'Admin',  
    async execute (client, message, args) {
        try {
            const input = args[0];  
            const fileExts = ["jpg", "jpeg", "jfif", "gif", "png"];

            if(input.includes(`/`)) return message.channel.send({ embed: { description: `No directory traversal!`, color: client.config.school_color}});
            if(fileExts.forEach(fileExt => !input.endsWith(fileExt))) return message.channel.send({ embed: { description: `File doesn't end with any extension!`, color: client.config.school_color}});

            const imageEmbed = new MessageEmbed()
            .attachFiles([`./assets/${input}`])
            .setImage(`attachment://${input}`)
            .setColor(client.config.school_color)

            message.channel.send(imageEmbed);
        } catch (err) {
            if (err) throw err; 
        }
    }
} 