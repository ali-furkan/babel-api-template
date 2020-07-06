import {Controller,Get, Post,Delete,Options,Put} from "../../Decorators/Controller"

@Controller("/user")
export class UserController {
    @Get("/whoami")
    whoami(req) {
        return "Hello World"
    }
}