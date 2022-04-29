import { Document, model, Schema } from "mongoose"

export interface UserInt extends Document {
    discordId: string;
    isInGame: boolean;
    currentGame: "rps"|"null";
}

export const User = new Schema({
    discordId: String,
    isInGame: Boolean,
    currentGame: String,
})

export default model<UserInt>("user", User)