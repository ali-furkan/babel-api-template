import "./controller"
import Container from "typedi"
import {CONST} from "../../config"
import {Logger} from "../services/Logger"

export const Router = {
    register: () => {
        const app = Container.get(CONST.APP)
        const Controllers = Container.getMany(CONST.CONTROLLERS)
        Controllers.forEach(controller=> {
            const instance = new controller()
            const prefix = Reflect.getMetadata("prefix",controller)
            const routes = Reflect.getMetadata("routes",controller);
            routes.forEach(route => {
                app[route.requestMethod](CONST.ROOT_PATH+prefix+route.path,...route.middlewares,async (req,res)=>{
                    try {
                        const response = await instance[route.methodName](req,res)
                        res.statusCode = response.code||200
                        if(response.err) res.statusCode = response.err["code"]||400
                        if(response.code) delete response.code
                        res.send(response)
                    }
                    catch(e) {
                        Logger.log("warn","Controller Warning:",route.methodName,e)
                    }
                })
            })
        })
        Logger.log("complete","Successfully Loaded",Controllers.length,"Controllers")
    }
}