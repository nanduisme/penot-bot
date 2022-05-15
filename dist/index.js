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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const connectDatabase_1 = require("./database/connectDatabase");
const IntentOptions_1 = require("./config/IntentOptions");
const onReady_1 = __importDefault(require("./events/onReady"));
const onInteraction_1 = require("./events/onInteraction");
const { TOKEN } = require("dotenv").config().parsed;
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const client = new discord_js_1.Client({
        intents: IntentOptions_1.IntentOptions
    });
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setStatus("idle");
    yield (0, connectDatabase_1.connectDatabase)();
    client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, onReady_1.default)(client); }));
    client.on("interactionCreate", (interaction) => (0, onInteraction_1.onInteraction)(interaction));
    yield client.login(TOKEN);
}))();
//# sourceMappingURL=index.js.map