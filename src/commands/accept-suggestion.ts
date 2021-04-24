import { MessageEmbed } from "discord.js";

module.exports = {
  name: "accept-suggestion",
  async run(client, message, args, db) {
    let suggestionID = args[0];
    if (!suggestionID)
      return message.channel.send("No suggestion ID was given");
    if (!db.has(`suggestions_${message.guild.id}.${suggestionID}`))
      return message.channel.send("No such suggestion ID");
    let data = db.get(`suggestions_${message.guild.id}.${suggestionID}`);

    let channel = message.guild.channels.cache.get(
      db.get(`channel_${message.guild.id}`)
    );

    (await channel.fetch()).messages.fetch(data.messageID).then((msg) => {
      msg.edit(
        new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(
            `Suggestion from ${data.madeBy.username} (${data.madeBy.id})`,
            data.authorAvatar
          )
          .setDescription(
            `${data.suggestion}\n\n*Suggestion ID is: ${suggestionID}*`
          )
          .setFooter("Status: accepeted")
      );
    });
    message.reply("Suggestion has been accepeted");
  },
};
