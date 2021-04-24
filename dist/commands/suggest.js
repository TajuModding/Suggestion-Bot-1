"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "suggest",
    run: (client, message, args, db) => __awaiter(void 0, void 0, void 0, function* () {
        let channel = db.get(`channel_${message.guild.id}`);
        if (!channel)
            return message.reply("No suggestion channel is saved");
        if (!message.guild.channels.cache.has(channel))
            return message.channel.send("The suggestion channel was found in the database but not in the server, Was it deleted?");
        let ch = message.guild.channels.cache.get(channel);
        let suggestion = args.join(" ");
        if (!suggestion)
            return message.channel.send("No suggestion was given");
        function createID() {
            let abcs = "abcdefghijklmnopqrstadpoasmdAIPSOdjdjackmxvkobsdojpajpdcoANFDAIPOCNSAqjhauposfbwuoipfnsaipoNDFuqpofnapofklSANFwpoquifndaklfsdfljkasdbnusovbsipfwjapofsbndfjksbnfwi";
            let chars = abcs.split("");
            let genResult = Math.floor(Math.random() * 100) +
                chars[Math.floor(Math.random() * chars.length)] +
                chars[Math.floor(Math.random() * chars.length)] +
                chars[Math.floor(Math.random() * chars.length)] +
                Math.floor(Math.random() * 100);
            return genResult;
        }
        let ID = createID();
        while (db.has(`suggestions_${message.guild.id}.${ID}`)) {
            ID = createID();
        }
        const embed = new discord_js_1.MessageEmbed()
            .setColor("YELLOW")
            .setAuthor(`Suggestion from ${message.author.username} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${suggestion}\n\n*Suggestion ID is: ${ID}*`)
            .setFooter(`Status: pending`);
        let msg = yield ch.send(embed);
        message.channel.send("The mod team has gotten the suggestion");
        db.set(`suggestions_${message.guild.id}.${ID}`, {
            messageID: msg.id,
            createdAt: new Date(),
            madeBy: message.author,
            authorID: message.author.id,
            suggestion,
            authorAvatar: message.author.displayAvatarURL({ dynamic: true }),
        });
        db.save();
    }),
};
