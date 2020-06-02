import {Schema,model} from "mongoose"

const GameSchema = new Schema({
    id: Number,
    flag: String,
})

export const Game = model("Game",GameSchema)