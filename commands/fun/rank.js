const { MessageEmbed } = require(`discord.js`); //for embed functionality
const admin = require('firebase-admin');
const key = require(`./scu-discord-bot-firebase-admin.json`);

//BIG THANKS TO MARK RIZKO [https://github.com/markrizko/] for allowing me to use this!

module.exports = {
    name: 'rank',
    description: 'Find your rank in the server!',
    category: 'Fun',  
    async execute (client, message, args) {
      admin.initializeApp({
	      credential: admin.credential.cert(key),
      });

      const db = admin.firestore();
      
      const usersRef = db.collection(message.guild.name);
      const users = await usersRef.orderBy('karma', 'desc').get();

      let scoreboard = '';
      let place = 1;
      await users.docs.forEach(async user => {
        const userData = user.data();
        message.guild.members.fetch(userData.id).then(guildMember => {
          scoreboard += `${place}. **${guildMember.user.username} :** ${userData.karma}\n`;
          place += 1;
        });
      });

      const embed = new MessageEmbed()
        .setTitle('Rank Leaderboard')
        .setDescription(scoreboard)
        .setColor(client.config.school_color)

      await message.channel.send(
        embed,
      );
	    
      if (args[1] == '++' || args[1] == '--') {
        const mention = message.mentions.users.first();
        if (message.author.id == mention.id) {
          message.channel.send({ embed: { description: 'Can\'t give karma to yourself!', color: client.config.school_color}});
          return;
        }
        const userRef = db.collection(message.guild.name).doc(mention.id);
        const snapshot = await userRef.get();
        const data = snapshot.data();
        let karma = data && data.karma || 0;

        if (args[1] === '++') {
          karma++;
        } else if (args[1] === '--') {
          karma--;
        }
        
        await userRef.set({
          karma,
          id: mention.id.toString(),
        });

        const pointStr = karma === 1 ? 'point' : 'points';
        await message.channel.send({ embed: { description: `${mention.username} you now have ${karma} ${pointStr}`, color: client.config.school_color}});
      }
    }
}
