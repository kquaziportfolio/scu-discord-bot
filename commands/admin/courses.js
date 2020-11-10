const fetch = require(`node-fetch`);

module.exports  = {
    name: 'courses',
    description: 'Checks SCU\'s CourseAvail portal for new courses!',
    args: true,
    usage: `[search query]`,
    category: 'Utility',
    async execute(client, message, args) {

        const searchQuery = args[0];
        const url = `https://www.scu.edu/apps/ws/courseavail/search/4200/ugrad/${searchQuery}`;
        const response = await fetch(url);
        const body = await response.json();

        if (body.length > 2000) {
            const firstHalf = body.substring(0, 1999);
            const secondHalf = body.substring(1999, body.length);
            message.channel.send(firstHalf);
            message.channel.send(secondHalf);
        } else {
            message.channel.send(body);
        }
    }
}