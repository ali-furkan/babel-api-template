import Container from "typedi"
import {CONST} from "../constants"
import {METHOD} from "../libs/method"

export const Controller = prefix => {
    return target => {
        Container.set(
          {
            id: CONST.CONTROLLERS,
            value: target,
            multiple: true
          }
        )
        Reflect.defineMetadata('prefix', prefix, target);
        if (! Reflect.hasMetadata('routes', target)) {
          Reflect.defineMetadata('routes', [], target);
        }
    }
}

export const Get = METHOD("get")
export const Post = METHOD("post")
export const Delete = METHOD("delete")
export const Put = METHOD("put")
export const Options = METHOD("options")