import dotenv from  "dotenv"
dotenv.config()

export const CONST = {
    PORT: "PORT",
    APP: "app",
    CONTROLLERS: "controllers",
}

export const CONFIG = {
    PORT: process.env.PORT||process.argv[2]||3000,
    ROOT_PATH: "/v1",
    MONGO_URI: process.env.MONGO_URI||""
}