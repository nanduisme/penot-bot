import { Document, model, Schema } from "mongoose"

export interface UserInt extends Document {
    discordId: string;
    messageCount: number;
}

export const User = new Schema({
    discordId: String,
    messageCount: Number
})

export default model<UserInt>("user", User)