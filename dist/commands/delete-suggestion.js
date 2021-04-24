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
    name: "delete-suggestion",
    run(client, message, args, db) {
        return __awaiter(this, void 0, void 0, function* () {
            let ID = args[0];
            if (!ID)
                return message.channel.send("No suggestion ID was given");
            if (!db.has(`suggestions_${message.guild.id}.${ID}`))
                return message.reply("No suggestion with that ID");
            let data = db.get(`suggestions_${message.guild.id}.${ID}`);
            db.delete(`suggestions_${message.guild.id}.${ID}`);
            db.save();
            message.reply("The suggestion has been deleted");
            let channel = message.guild.channels.cache.get(db.get(`channel_${message.guild.id}`));
            (yield channel.fetch()).messages.fetch(data.messageID).then((msg) => {
                msg.edit(new discord_js_1.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(`Suggestion from ${data.madeBy.username} (${data.madeBy.id})`, data.authorAvatar)
                    .setDescription(`${data.suggestion}\n\n*Suggestion ID is: ${ID}*`)
                    .setFooter("Status: deleted"));
            });
        });
    },
};
