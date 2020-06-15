const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const { get } = require("request-promise-native");

module.exports = {
	name: 'pokedex',
	description: 'pokedex!',
	async execute(message, args) {
		const pokemonInstructions = new Discord.MessageEmbed()
		.setColor(10231598)
		.setTitle("Pokedex Command")
		.addField("Description:", `Type in a Pokemon to learn more about it!\nHere's the [list](https://en.wikipedia.org/wiki/List_of_generation_I_Pok%C3%A9mon) of the first 151 ones!`, true)
		.addField("Usage:", "`>pokedex [Pokemon name]`", true)
		.addField("Example:", ">pokedex Pikachu")
		.setTimestamp()

		if(!args.length) return message.channel.send(pokemonInstructions)
		.then(msg => msg.delete({timeout: 10000}))
		.catch(err => console.log(`Error: ${err}`))

        message.channel.send("Fetching from the Pokedex...").then(msg => {
			const options = {
				url: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(" ")}`,
				json: true
			}
			get(options).then(body => {
			  
			  let embed = new MessageEmbed()
			  .setAuthor(body.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.typeIcon}`)
			  .setDescription(body.info.description)
			  .setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.photo}`)
			  .setColor(10231598)
			  .setFooter(`Weakness of pokemon - ${body.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.weaknessIcon}`)
			  
			  message.channel.send(embed)
			}).catch(err => console.log(`Error: ${err}`))
		  }).then(message.channel.send(pokemonInstructions))
		  .catch(err => console.log(`Error: ${err}`))
    }
}