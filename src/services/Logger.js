import { EventEmitter} from "events"
import chalk from "chalk"
import moment from "moment"
import { CONFIG } from "../../config";

/**
 * @typedef {"success"|"error"|"warn"|"awaiting"|"start"|"pause"|"complete"|"note"|"debug"} TYPES
 * @typedef {"memory"|"db"|"none"} SAVE_TYPE
 */
const
    TYPES = ["success","error","warn","awaiting","start","pause","complete","note","debug"],
    TYPE_COLORS = ["greenBright","redBright","yellow","blue","green","yellowBright","cyan","blue","blueBright"],
    TYPE_BADGE = {
        emojis: ["🎉","🚨","⚠️","⌛","🏁","✋","👌","📝","🐛"],
        unix: ["✔","X","⚠","...","➤","■","¤","●","[DEBUG]"]
    },
    DEF_LOG_CONFIG = {
        displayDate: true,
        displayBadge: true,
        typeDate: moment.HTML5_FMT.DATETIME_LOCAL,
        typeBadge: "unix"
    },
    DEF_LOGGER_CONFIG = {
        saveDb: false,
        monitoring: false,
    }
/**
 * Log Factory
 * @param {TYPES} type 
 * @param {*} msg 
 * @param {DEF_LOG_CONFIG} config 
 */
function LogFactory(type,msg,config={}) {
    if(!type) return;
    const i = TYPES.findIndex(t=>t==type)
    if(i<0) return;
    let c = config
    if(typeof config !== "object"||Array.isArray(config)) c = {}
    Object.assign(c,DEF_LOG_CONFIG,config)
    let res = []
    if(c.displayDate) res.push(chalk.grey(`[${moment().format(c.typeDate)}]`))
    if(c.displayBadge) res.push(chalk[TYPE_COLORS[i]](TYPE_BADGE[c.typeBadge][i]))
    res.push(chalk.underline[TYPE_COLORS[i]](TYPES[i]))
    res.push(msg)
    return res.join(" ")
}

class LoggerInstance extends EventEmitter {
    constructor(config={}) {
        super();
        this.config = config
        if(typeof config !== "object"||Array.isArray(config)) this.config = {}
        this.config = Object.assign({}, DEF_LOGGER_CONFIG,this.config)
    }
    /**
     * Logger
     * @param {TYPES} [type="debug"] 
     * @param {*} msg 
     */
    log(type="debug",...msg) {
        if(!msg) throw Error("Msg parameter mustn't undefined");
        const raw = {type,msg,date: new Date()}
        if(this.config.monitoring) {
            const log = LogFactory(type,msg.join(" "))
            if(type==="error") this.emit("error",log,raw)
            else this.emit("debug",log,raw)
        }
        return this
    }
}

export const Logger = new LoggerInstance(CONFIG.LOG) 