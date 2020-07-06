import mongoose from "mongoose"
import {Logger} from "../services/Logger"

export const registerDB = () => {
    const 
        { DB_ACC,DB_HOST,DB_PSW,DB_USERNAME } = process.env,
        uri = `mongodb://${DB_USERNAME}:${DB_PSW}@${DB_HOST}/${DB_ACC}`
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection
        .on("error", ()=>Logger.log("error","Mongoose Error: Connection Failed"))
        .once("open",()=>Logger.log("start","Connected to MongoDB"))
}