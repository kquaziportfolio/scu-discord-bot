const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const fetch = require('node-fetch');
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

module.exports = {
	name: 'pokedex',
	description: 'pokedex!',
	async execute(message, args) {
		async function getPokemon(pokemon) {
			let response = await fetch(`${BASE_URL}/${pokemon}`);
			return await response.json();
		}
		
		const pokemonInstructions = new Discord.MessageEmbed()
		.setColor(10231598)
		.setTitle("__**Pokedex Command**__")
		.addField("Description:", `Type in a Pokemon to learn more about it!\nHere's the [list](https://en.wikipedia.org/wiki/List_of_generation_I_Pok%C3%A9mon) of the first 151 ones!`, true)
		.addField("Usage:", "`>pokedex [Pokemon name]`", true)
		.addField("Example:", ">pokedex Pikachu", true)
		.setTimestamp()

		if(!args.length) return message.channel.send(pokemonInstructions)
		.then(msg => msg.delete({timeout: 10000}))
		.catch(err => console.log(`Error: ${err}`))

		const pokemon = message.content.toLowerCase().split(" ")[1];
        try {
            const pokeData = await getPokemon(pokemon);
            const { 
                sprites, 
                stats, 
				weight, 
				height,
                name, 
                id, 
                base_experience,
                types
            } = pokeData;
            const embed = new MessageEmbed();
            embed.setTitle(`__**${name.toUpperCase()}**__ __**#${id}**__`)
            embed.setThumbnail(`${sprites.front_default}`);
            stats.forEach(stat => embed.addField(`__**${stat.stat.name.toUpperCase()}**__`, stat.base_stat, true));
            types.forEach(type => embed.addField('__**Type**__', type.type.name, true));
			embed.addField('__**Weight**__', `${weight} lbs`, true);
			embed.addField('__**Height**__', `${height} ft`, true);
			embed.addField('__**Base Experience**__', `${base_experience} XP`, true);
			embed.setColor(10231598);
            message.channel.send(embed).catch(err => `Error: ${err}`)
        }
        catch(err) {
			message.channel.send({embed: {description: `Pokemon __**${pokemon}**__ does not exist.`, color: 10231598}})
			.then(msg => msg.delete({timeout: 5000}))
			.catch(err => `Error: ${err}`)
        }
    }
}