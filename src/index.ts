import { Client, Collection } from "discord.js";
const client = new Client();
const { slayersDB } = require("slayer.db");
const db = new slayersDB({
  saveInternal: {
    func: true,
    dir: "./database",
    fileName: "data",
  },
});
const fs = require("fs");

let commands = new Collection();

let folderNameArray = __dirname.split("\\");
let folderName = folderNameArray[folderNameArray.length - 1];

let files = fs.readdirSync(`./${folderName}/commands/`);

files.forEach((file) => {
  let pull = require(`./commands/${file}`);
  commands.set(pull.name, pull);
});

interface commandInterface {
  run: Function;
  name: string;
}

require("dotenv").config();

client.on("ready", () => {
  console.clear();
  console.log("Ready");
});

client.on("message", (message) => {
  let prefix = process.env.BOT_PREFIX;
  if (message.author.bot) return;
  if (db.has(`prefixes_${message.guild.id}`))
    prefix = db.get(`prefixes_${message.guild.id}`);
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (commands.has(command)) {
    let cmd = <commandInterface>commands.get(command);
    cmd.run(client, message, args, db);
  }
});

client.login(process.env.BOT_TOKEN);
