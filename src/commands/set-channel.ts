module.exports = {
  name: "set-channel",
  permissions: ["MANAGE_GUILD"],
  run: (client, message, args, db) => {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send("No channel was mentioned");

    db.set(`channel_${message.guild.id}`, channel.id);
    db.save();

    message.channel.send(`Set suggestion channel to ${channel.name}`);
  },
};
