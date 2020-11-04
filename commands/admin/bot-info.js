const package = require(`../../package.json`);
let isAdmin = require(`../../modules/isAdmin.js`);

module.exports = { 
    name: 'bot-info',
    description: 'Get the bot\'s info!',
    category: 'Admin',  
    async execute(client, message, args) {
      if(isAdmin(client, message, false)) {
        const jsonData = () => {
            for(var i = 0; i < package.dependencies.length; i++) {
                const obj = package.dependencies[i];

                message.channel.send(obj.id);
            }
        };
        message.channel.send({
          embed: {
            color: client.config.school_color,
            author: {
              name: "SCU Discord Network",
              icon_url: client.user.avatarURL()
            },
            description:
              "Created by the server lords!",
            fields: [
              {
                name: "Prefix",
                value: `\`${client.config.prefix}\``,
                inline: true
              },
              {
                name: "Documentation",
                value: `${client.config.verification.githubLink}blob/master/README.md`,
                inline: true
              },
              {
                name: "Version",
                value: `\`${package.version}\``,
                inline: true
              },
              {
                name: "Dependencies",
                value: `${jsonData}`,
                inline: true
              },
            ],
          },
      });
    }
  }
}
