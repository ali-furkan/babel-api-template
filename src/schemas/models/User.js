import {Schema,model} from "mongoose"

const UserSchema = new Schema({
    id: Number,
    flag: String,
    status: Boolean,
    username: String,
    mail: String,
    password: String,
    avatar: Number,
    points: Number,
    country: String,
    energy: Number,
    cds: [{
        code: Number,
        expire: Number
    }],
    createdAt: Date,
})

export const User = model("User",UserSchema)