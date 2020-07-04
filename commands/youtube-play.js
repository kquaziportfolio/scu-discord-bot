const ytdl = require('ytdl-core');

module.exports = {
	name: 'youtube-play',
	description: 'youtube play command.',
	async execute(message, args, ops) {
        if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel!");

        if(message.guild.me.voiceChannel) return message.channel.send("Sorry, the bot is already in a voice channel!");

        if(!args[0]) return message.channel.send("You didn't provide a link!");

        let validate = await ytdl.validateURL(args[0]);

        let (!validate) = await message.channel.send("Something happened! Please try again!");
        
        let info = await ytdl.getInfo(args[0]);

        let connection = await message.member.voiceChannel.join();

        let dispatcher = await connection.playStream(ytdl(args[0], { filter: `audioonly`}));

        message.channel.send(`Now playing: ${info.tite}`);
             
	}
}