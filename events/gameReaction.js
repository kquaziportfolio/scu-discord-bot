/*
==========================================================================================
  _____   ____  _      ______   _____  ______          _____ _______ 
 |  __ \ / __ \| |    |  ____| |  __ \|  ____|   /\   / ____|__   __|
 | |__) | |  | | |    | |__    | |__) | |__     /  \ | |       | |   
 |  _  /| |  | | |    |  __|   |  _  /|  __|   / /\ \| |       | |   
 | | \ \| |__| | |____| |____  | | \ \| |____ / ____ \ |____   | |   
 |_|  \_\\____/|______|______| |_|  \_\______/_/    \_\_____|  |_|   
==========================================================================================
  */

 const events = {
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove",
};

module.exports = async (event) => {
    if (!events.hasOwnProperty(event.t)) return;
    const { d: data } = event;
    if (data.message_id != client.gameReaction.roleReact.message) return;
    if (client.gameReaction.roleReact.emojis.includes(event.d.emoji.id)) {
      //user that reacted
      let user = client.users.get(data.user_id);
      const channel = client.channels.get(data.channel_id);
      if (channel.messages.has(data.message_id)) return;
      const message = await channel.fetchMessage(data.message_id);
  
      const emojiKey = data.emoji.id ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
      const reaction = message.reactions.get(emojiKey);
      client.emit(events[event.t], reaction, user);
    }
}
  
module.exports = async (reaction, user) => {
    if (user.bot) return;
    if (client.gameReaction.roleReact.emojis.indexOf(reaction.emoji.id) == -1) return;
    let roleName = client.gameReaction.roleReact.roles[client.gameReaction.roleReact.emojis.indexOf(reaction.emoji.id)];
    let role = client.guilds.get(reaction.emoji.guild.id).roles.find((r) => r.name == roleName);
    let member = reaction.message.guild.members.find((m) => m.id == user.id);
    member.send({embed: { description: `You were given the role **${roleName}**`}});
    member.addRole(role.id);
} 
  
module.exports = async (reaction, user) => {
    if (user.bot) return;
    if (client.gameReaction.roleReact.emojis.indexOf(reaction.emoji.id) == -1) return;
    let roleName = client.gameReaction.roles[client.gameReaction.roleReact.emojis.indexOf(reaction.emoji.id)];
    let role = client.guilds.get(reaction.emoji.guild.id).roles.find((r) => r.name == roleName);
    let member = reaction.message.guild.members.find((m) => m.id == user.id);
    member.send({embed: { description: `Removed **${roleName}** from you`}});
    member.removeRole(role.id);
}