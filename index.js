import "reflect-metadata"
import App from "./src/app"
import {Logger} from "./src/services/Logger"

Logger
    .on("debug",ctx=>console.log(ctx))
    .on("error",ctx=>console.log(ctx))
App.init()
