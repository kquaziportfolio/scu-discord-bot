const package = require(`../../package.json`);
let isAdmin = require(`../../modules/isAdmin.js`);

module.exports = { 
    name: 'bot-info',
    description: 'Get the bot\'s info!',
    category: 'Admin',  
    async execute(client, message, args) {
      if(isAdmin(client, message, false)) {
        message.channel.send({
          embed: {
            color: client.config.school_color,
            author: {
              name: "SCU Discord Network",
              icon_url: "https://jasonanhvu/scu-discord-bot/assets/logo-pic.png",
              url: client.config.verification.githubLink,
            },
            description:
              "Created by the server lords!",
            fields: [
              {
                name: "Prefix",
                value: `\`${client.config.prefix}\``,
                inline: true,
              },
              {
                name: "Documentation",
                value: `${client.config.githubLink}blob/master/README.md`,
              },
              {
                name: "Version",
                value: `\`${package.version}\``,
                inline: true,
              },
              {
                name: "Dependencies",
                value: `${package.dependencies}.join("\n")}`,
              },
            ],
          },
      });
    }
  }
}
