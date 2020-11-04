const package = require(`../../package.json`);
let isAdmin = require(`../../modules/isAdmin.js`);

module.exports = { 
    name: 'bot-info',
    description: 'Get the bot\'s info!',
    category: 'Admin',  
    async execute(client, message, args) {
        message.channel.send({
          embed: {
            color: client.config.school_color,
            author: {
              name: "SCU Discord Network",
              icon_url: client.user.avatarURL()
            },
            description: `\`{package.description}\``,
            fields: [
              {
                name: "Prefix",
                value: `\`${client.config.prefix}\``,
                inline: true
              },
              {
                name: "Documentation",
                value: `[Here you go!](${package.homepage})`,
                inline: true
              },
              {
                name: "Version",
                value: `\`${package.version}\``,
                inline: true
              },
              {
                name: "Dependencies Used",
                value: `${Object.entries(package.dependencies).join("\n")}`,
                inline: true
              },
            ],
          },
      });
    }
  }
