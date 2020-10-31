const prefixConf = require(`../commands/admin/prefix.json`);

module.exports = async (client, guild) => {
  if (!prefixConf[guild.id]) { // If the guild's id is not on the GUILDCONF File, proceed
    prefixConf[guild.id] = {
      prefix: client.config.prefix
    }
  }
  
  fs.writeFile('./storages/guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
     	if (err) console.log(err)
	})
}
