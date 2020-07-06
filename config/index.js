import dotenv from  "dotenv"
dotenv.config()

process.env.NODE_ENV = process.env.NODE_ENV||"development"

export const isProd = process.env.NODE_ENV == "production"

export const CONST = {
    PORT: "PORT",
    APP: "app",
    CONTROLLERS: "controllers",
}

export const CONFIG = {
    PORT: parseInt(process.env.PORT)||parseInt(process.argv[2])||3000,
    ROOT_PATH: "/v1",
    MONGO_URI: process.env.MONGO_URI||"",
    LOG: {
        monitoring: !isProd,
        savedb: isProd
    }
}
