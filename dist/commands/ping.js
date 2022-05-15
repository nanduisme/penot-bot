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
exports.ping = void 0;
const builders_1 = require("@discordjs/builders");
exports.ping = {
    data: new builders_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Find latency of bot and the API"),
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
        yield interaction.editReply(`Pong! Latency is \`${Math.round(interaction.client.ws.ping)}ms\``);
    }),
};
//# sourceMappingURL=ping.js.map