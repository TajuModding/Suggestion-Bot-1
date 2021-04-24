require("dotenv").config();
module.exports = {
  name: "prefix",
  run(client, message, args, db) {
    let newPrefix = args.join(" ");
    if (!newPrefix)
      return message.channel.send(
        `Prefix is: \`${
          db.has(`prefixes_${message.guild.id}`)
            ? db.get(`prefixes_${message.guild.id}`)
            : process.env.BOT_PREFIX
        }\``
      );

    db.set(`prefixes_${message.guild.id}`, newPrefix);

    db.save();

    message.reply(`Prefix set to: ${newPrefix}`);
  },
};
