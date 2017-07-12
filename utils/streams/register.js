const logger = require("../log.js").createLogger("streams/register")
const match = require("../match")
const decorateApplet = require("./decorateApplet")

const runActions = require("../runActions")

module.exports = applet => {
    applet = decorateApplet(applet)

    applet.config.stream.start(applet.config.stream, (event) => {
        if (match(event, applet.config[applet.trigger.id])) {
            runActions(applet, applet.trigger.extract_ingredients(event))
        }
    })
}
