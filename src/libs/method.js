export const METHOD = method => {
  return (path) => {
    return (target,propertyKey) => {
      if (!Reflect.hasMetadata('routes', target.constructor)) {
        Reflect.defineMetadata('routes', [], target.constructor);
      }
      const routes = Reflect.getMetadata('routes', target.constructor);
      routes.push({
        requestMethod: method,
        middlewares: [],
        path,
        methodName: propertyKey
      });
      Reflect.defineMetadata('routes', routes, target.constructor);
    }
  }
}