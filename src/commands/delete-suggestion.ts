import { MessageEmbed } from "discord.js";

module.exports = {
  name: "delete-suggestion",
  async run(client, message, args, db) {
    let ID = args[0];
    if (!ID) return message.channel.send("No suggestion ID was given");
    if (!db.has(`suggestions_${message.guild.id}.${ID}`))
      return message.reply("No suggestion with that ID");

    let data = db.get(`suggestions_${message.guild.id}.${ID}`);

    db.delete(`suggestions_${message.guild.id}.${ID}`);

    db.save();

    message.reply("The suggestion has been deleted");

    let channel = message.guild.channels.cache.get(
      db.get(`channel_${message.guild.id}`)
    );

    (await channel.fetch()).messages.fetch(data.messageID).then((msg) => {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(
            `Suggestion from ${data.madeBy.username} (${data.madeBy.id})`,
            data.authorAvatar
          )
          .setDescription(`${data.suggestion}\n\n*Suggestion ID is: ${ID}*`)
          .setFooter("Status: deleted")
      );
    });
  },
};
