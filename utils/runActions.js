const logger = require("./log").createLogger("runActions")

module.exports = (applet, ingredients) => {
    logger.log("going to run actions", Object.keys(ingredients), applet.config)
    applet.actions.map(({ exec, id }) =>
        exec(applet, ingredients, applet.config[id])
    )
}
