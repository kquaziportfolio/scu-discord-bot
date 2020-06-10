const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = async (message) => {
    const embed = new MessageEmbed()
        .setTitle(`Nicene Creed`)
        .setColor(10231598)
        .setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZs7N11VSkjrLIOOrJgS6UYZKlajuc9YwS4z2jui3wD947iYDt&usqp=CAU`)
        .setDescription('I believe in one God, the Father almighty, Maker of heaven and earth, and of all things visible and invisible' +
        ' And in one Lord Jesus Christ, the only-begotten Son of God, born of the Father before all ages. God of God; Light of Light; true God of true God;' +
        ' begotten not made; consubstantial with the Father, by whom all things were made. Who for us men, and for our salvation, came down from heaven, and' +
        ' was incarnate by the Holy Ghost of the Virgin Mary: and was made man. He was crucified also for us, suffered under Pontius Pilate, and was buried.' +
        ' The third day he rose again according to the Scriptures; and ascended into heaven, and sitteth at the right hand of the Father: and he shall come' +
        ' again with glory to judge both the living and the dead: of whose kingdom there shall be no end. And I believe in the Holy Ghost, the Lord and life-giver,' + 
        ' who proceedeth from the Father and the Son: who together with the Father and the Son is adored and glorified; who spake by the prophets. And one holy' +
        ' Catholic and Apostolic Church. I confess one baptism for the remission of sins. And I look for the resurrection of the dead, and the life of the world to come. Amen')
        message.channel.send(embed);
}