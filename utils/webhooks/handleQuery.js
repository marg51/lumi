const logger = require("../log.js").createLogger("webhooks/handleQuery")
const fs = require("fs")

const filterTrigger = require("./filterTrigger")

const runActions = require("../runActions")

module.exports = applet => (req, res, next) => {
    try {
        let { params, body, headers } = req

        if (applet.config.webhook.transform)
            body = applet.config.webhook.transform(body)

        const data = {
            params,
            body,
            headers,
            config: applet.config[applet.trigger.id],
        }

        if (applet.config.debug) {
            const filename = `${__dirname}/../../logs/${applet.service.id}-${applet.trigger.id}-${Date.now()}`

            fs.writeFile(
                filename,
                JSON.stringify(data),
                (err, res) =>
                    (err ? logger.error(err) : logger.log("logged", filename))
            )
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
