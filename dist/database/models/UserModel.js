"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
exports.User = new mongoose_1.Schema({
    discordId: String,
    currentGame: {
        type: String,
        default: "null",
    },
});
exports.User.methods.isInGame = function () {
    return this.currentGame !== "null";
};
exports.default = (0, mongoose_1.model)("user", exports.User);
//# sourceMappingURL=UserModel.js.map