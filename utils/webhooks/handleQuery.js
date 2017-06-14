const logger = require("../log.js").createLogger("webhooks/handleQuery")

const filterTrigger = require("./filterTrigger")

const runActions = require("../runActions")

module.exports = applet => (req, res, next) => {
    try {
        const { params, body, headers } = req

        const data = {
            params,
            body,
            headers,
            config: applet.config[applet.trigger.id],
        }

        const is_valid = filterTrigger(applet, data)

        if (!is_valid) {
            logger.log("skipping, filters not valid")
            return
        }

        runActions(applet, applet.trigger.extract_ingredients(data))
    } catch (e) {
        logger.error(e)
    }
}
