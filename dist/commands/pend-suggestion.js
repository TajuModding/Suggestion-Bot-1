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
    name: "pend-suggestion",
    run(client, message, args, db) {
        return __awaiter(this, void 0, void 0, function* () {
            let suggestionID = args[0];
            if (!suggestionID)
                return message.channel.send("No suggestion ID was given");
            if (!db.has(`suggestions_${message.guild.id}.${suggestionID}`))
                return message.channel.send("No such suggestion ID");
            let data = db.get(`suggestions_${message.guild.id}.${suggestionID}`);
            let channel = message.guild.channels.cache.get(db.get(`channel_${message.guild.id}`));
            (yield channel.fetch()).messages.fetch(data.messageID).then((msg) => {
                msg.edit(new discord_js_1.MessageEmbed()
                    .setColor("YELLOW")
                    .setAuthor(`Suggestion from ${data.madeBy.username} (${data.madeBy.id})`, data.authorAvatar)
                    .setDescription(`${data.suggestion}\n\n*Suggestion ID is: ${suggestionID}*`)
                    .setFooter("Status: pending"));
            });
            message.reply("Suggestion has been reset to pending");
        });
    },
};
