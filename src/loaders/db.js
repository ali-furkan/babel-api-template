import mongoose from "mongoose"
import {Logger} from "../services/Logger"
import {CONST,CONFIG} from "../../config"

export const registerDB = () => {
    const uri = CONFIG.MONGO_URI
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection
        .on("error", ()=>Logger.log("error","Mongoose Error: Connection Failed"))
        .once("open",()=>Logger.log("start","Connected to MongoDB"))
}