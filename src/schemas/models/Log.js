import {Schema,model} from "mongoose"

const LogSchema = new Schema({
    type: String,
    message: String,
    date: Date
})

export const Log = model("Log",LogSchema)