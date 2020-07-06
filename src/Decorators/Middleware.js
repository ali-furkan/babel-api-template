export const Middleware = mid => {
    return (target,propertyKey) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) Reflect.defineMetadata('routes', [], target.constructor);
        let routes = Reflect.getMetadata("routes", target.constructor)
        const route = routes.find(r=>r.methodName==propertyKey)
        if(!route) throw Error("Please add method decorator for request before")
        route.middlewares.push(mid)
        routes = routes.filter(r=>r.methodName!=propertyKey)
        Reflect.defineMetadata('routes', [...routes,route], target.constructor);
    }
}