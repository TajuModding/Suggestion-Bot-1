"use strict";
//By Rainbow Studios - https://discord.gg/Tccx7F7mMj
//Copyright use the code without credit and get sued
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client();
const { slayersDB } = require("slayer.db");
const db = new slayersDB({
    saveInternal: {
        func: true,
        dir: "./database",
        fileName: "data",
    },
});
const fs = require("fs");
let commands = new discord_js_1.Collection();
let folderNameArray = __dirname.split("\\");
let folderName = folderNameArray[folderNameArray.length - 1];
let files = fs.readdirSync(`./${folderName}/commands/`);
files.forEach((file) => {
    let pull = require(`./commands/${file}`);
    commands.set(pull.name, pull);
});
require("dotenv").config();
client.on("ready", () => {
    console.clear();
    console.log("Ready");
});
client.on("message", (message) => {
    let prefix = process.env.BOT_PREFIX;
    if (message.author.bot)
        return;
    if (db.has(`prefixes_${message.guild.id}`))
        prefix = db.get(`prefixes_${message.guild.id}`);
    if (!message.content.startsWith(prefix))
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (commands.has(command)) {
        let cmd = commands.get(command);
        cmd.run(client, message, args, db);
    }
});
client.login(process.env.BOT_TOKEN);
//By Rainbow Studios - https://discord.gg/Tccx7F7mMj
//Copyright use the code without credit and get sued
