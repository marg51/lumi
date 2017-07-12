const logger = require("./log").createLogger("runActions")
const schedule = require("./scheduler")

// context can be a stream
module.exports = (applet, ingredients) => {
    schedule(applet, applet.config.scheduler, ingredients, (data, context) => {
        logger.log("running", applet.trigger.id)
        applet.actions.map(({ exec, id }) =>
            exec(applet, data, applet.config[id], context)
        )
    })

}
