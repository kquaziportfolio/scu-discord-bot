const package = require(`../../package.json`);
let isAdmin = require(`../../modules/isAdmin.js`);

module.exports = { 
    name: 'bot-info',
    description: 'Get the bot\'s info!',
    category: 'Admin',  
    async execute(client, message, args) {
        if(isAdmin(client, message)) {
            const botInfo = {
                color: client.config.school_color,
                author: {
                  name: "SCU Discord Network",
                  icon_url: client.user.avatarURL()
                },
                url: `${package.homepage}`,
                title: `Bot Information`,
                description: `${package.description}`,
                fields: [
                  {
                    name: "Prefix",
                    value: `\`${client.config.prefix}\``,
                    inline: true
                  },
                  {
                    name: "Version",
                    value: `\`${package.version}\``,
                    inline: true
                  },
                  {
                    name: "License",
                    value: `\`${package.license}\``,
                    inline: true
                  },
                  {
                    name: "Dependencies Used",
                    value: `${Object.entries(package.dependencies).join(", ")}`,
                    inline: false
                  },
                ],
             };
             message.channel.send({embed: botInfo});
         }
      }
  }
