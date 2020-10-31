const { MessageEmbed } = require(`discord.js`); //for embed functionality
const leaderboard = require('firebase-admin');

//BIG THANKS TO MARK RIZKO [https://github.com/markrizko/] for allowing me to use this!

leaderboard.initializeApp({
	credential: leaderboard.credential.cert(client.config.api.leaderboard), //for leaderboard! :)
});

const db = leaderboard.firestore();

module.exports = {
    name: 'rank',
    description: 'Find your rank in the server!',
    category: 'Fun',  
    async execute (client, message, args) {
      const usersRef = db.collection(message.guild.name);
      const users = await usersRef.orderBy('karma', 'desc').get();

      let leaderboard = '';
      let place = 1;
      await users.docs.forEach(async user => {
        const userData = user.data();
        message.guild.members.fetch(userData.id).then(guildMember => {
          leaderboard += `${place}. **${guildMember.user.username} :** ${userData.karma}\n`;
          place += 1;
        });
      });

      const embed = new MessageEmbed()
        .setTitle('Rank Leaderboard')
        .setDescription(leaderboard)
        .setColor(client.config.school_color)

      await message.channel.send(
        embed,
      );
    }
}
