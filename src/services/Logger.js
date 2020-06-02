import { EventEmitter} from "events"
import chalk from "chalk"
import moment from "moment"
import mongoose from "mongoose"

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
const LogFactory = (type,msg,config={})=> {
    if(!type) return;
    const i = TYPES.findIndex(t=>t==type)
    if(i<0) return;
    if(config) {
        for(const key in DEF_LOG_CONFIG) {
            if(DEF_LOG_CONFIG[key]&&!config[key]) config[key] = DEF_LOG_CONFIG[key];
        }
    }
    else config = DEF_LOG_CONFIG
    let res = []
    if(config.displayDate) res.push(chalk.grey(`[${moment().format(config.typeDate)}]`))
    if(config.displayBadge) res.push(chalk[TYPE_COLORS[i]](TYPE_BADGE[config.typeBadge][i]))
    res.push(chalk.underline[TYPE_COLORS[i]](TYPES[i]))
    res.push(msg)
    return res.join(" ")
}

class Logger extends EventEmitter{
    constructor(config) {
        super();
        this.config = config
        for(const key in DEF_LOGGER_CONFIG) {
            if(!this.config[key]) this.config[key] = DEF_LOGGER_CONFIG[key];
        }
    }
    /**
     * Logger
     * @param {TYPES} [type="debug"] 
     * @param {*} msg 
     */
    log(type="debug",...msg) {
        if(!msg) throw Error("Msg parameter mustn't undefined");
        const raw = {type,msg,date: new Date()}
        if(this.config.saveDb) {
            const Log = new App.Log(raw)
            Log.save()
        }
        if(this.config.monitoring) {
            const log = LogFactory(type,msg.join(" "))
            if(type==="error") this.emit("error",log,raw)
            else this.emit("debug",log,raw)
        }
        return this
    }
}

export default new Logger({
    monitoring: true
})