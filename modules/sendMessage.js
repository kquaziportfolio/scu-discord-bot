module.exports = function sendMessage(client, channel, content) {
    client.guilds.cache.map((g) => {
      try {
        g.channels.cache.find((ch) => ch.id == channel).send(content);
      } catch (e) {
            return;
      }
    });
}
