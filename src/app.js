import express from "express"
import Container from "typedi"
import {CONST, CONFIG} from "../config"
import {Logger} from "./services/Logger"
import { registerAPI,registerDB } from "./loaders"

/**
 * 🌎 Server App Structure
 * @class App
 * @classdesc Web App Structure
 * @constructor App
 */
class App {
    constructor() {
        Container.set(CONST.APP,this.#app)
        Container.set(CONST.PORT,CONFIG.PORT)
    }
    #app = express()
    /**
     * Initializes the App and Establishing a connection to world
     * 
     * 🚨 Warn: Call only once
     * @returns App
     */
    async init() {
        await this.#app.listen(CONFIG.PORT,()=>{
            Logger.log("start",`App started at ${CONFIG.PORT} PORT`)
        })
        registerAPI()
        registerDB()
        return this
    }
}

export default new App()