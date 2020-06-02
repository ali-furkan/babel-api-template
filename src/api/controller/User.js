import {Controller,Get, Post,Delete,Options,Put} from "../../Decorators/Controller"
import {Request,Response} from "express"

@Controller("/user")
export class UserController {
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    @Get("/")
    get(req,res) {
        return res.send("Helloww")
    }
    @Post("/")
    post(req,res) {
        return res.send("Helloww")
    }
    @Put("/")
    put(req,res) {
        return res.send("Hellow")
    }
    @Delete("/")
    delete(req,res) {
        return res.send("Helloww")
    }
    @Options("/")
    options(req,res) {
        return res.send("Helloww")
    }
}