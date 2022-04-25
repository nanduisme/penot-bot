import { connect } from "mongoose";
const { MONGO_URI } = require('dotenv').config().parsed;

export const connectDatabase = async () => {
    await connect(MONGO_URI)
    console.log("Database connected!")
}
