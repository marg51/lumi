const logger = require("./log").createLogger("runActions")

module.exports = (applet, ingredients) => {
    logger.log("going to run actions")
    applet.actions.map(({ exec, id }) =>
        exec(applet, ingredients, applet.config[id])
    )
}
