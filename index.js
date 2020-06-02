import "reflect-metadata"
import App from "./src/app"
import Logger from "./src/services/Logger"
import { config } from "dotenv"
config()

Logger
    .on("debug",ctx=>console.log(ctx))
    .on("error",console.log)
App.init()

/**
 *     import { Controller,Get } from "./src/utils/Services"

    import express from 'express';
    const app = express();

    @Controller("/v1")
    class UserController {
        @Get("/")
        hello(req,res) {
            return res.send("Hello World")
        }
    }

    [
        UserController
    ].forEach(controller => {
        // This is our instantiated class
        const instance                       = new controller();
        // The prefix saved to our controller
        const prefix                         = Reflect.getMetadata('prefix', controller);
        // Our `routes` array containing all our routes for this controller
        const routes = Reflect.getMetadata('routes', controller);
        
        // Iterate over all routes and register them to our express application 
        routes.forEach(route => {
        // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
        // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
        // this should be enough for now.
        app[route.requestMethod](prefix + route.path, (req, res) => {
            // Execute our method for this path and pass our express request and response object.
            instance[route.methodName](req, res);
        });
        });
    });

    app.listen(3000)
 */