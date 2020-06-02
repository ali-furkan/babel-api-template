import "./controller"
import Container from "typedi"
import {CONST} from "../constants"

export const Router = {
    register: () => {
        const app = Container.get(CONST.APP)
        Container.getMany(CONST.CONTROLLERS)
        .forEach(controller=> {
            const instance = new controller()
            const prefix = Reflect.getMetadata("prefix",controller)
            const routes = Reflect.getMetadata("routes",controller);
            routes.forEach(route => {
                app[route.requestMethod](CONST.ROOT_PATH+prefix+route.path,(req,res,next)=>{
                    instance[route.methodName](req,res,next)
                })
            })
        })
    }
}