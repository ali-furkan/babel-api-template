import {Router} from "../api"
import Container from "typedi"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"

/**
 * Registers API
 * - loads middlewares
 * - loads routes
 */
export const registerAPI = () => {
    const app = Container.get("app")
    app.enable("trust proxy")
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    Router.register()
}