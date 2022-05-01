import { Document, model, Schema } from "mongoose"

export interface UserInt extends Document {
    discordId: string;
    currentGame: "rps" | "null" | "xo";
    isInGame(): boolean;
}

export const User = new Schema({
    discordId: String,
    currentGame: {
        type: String,
        default: "null",
    },
})

User.methods.isInGame = function (): boolean { 
    return this.currentGame !== "null";
}

export default model("user", User)