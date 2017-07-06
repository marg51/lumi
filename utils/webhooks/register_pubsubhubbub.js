const logger = require("../log.js").createLogger(
    "webhooks/registerPubsubhubbub"
)

// this is instagram's way of doing it
module.exports = function registerPubsubhubbub(server, method, url, config) {
    if (method == "get")
        return logger.error(
            "can't register validation due to webhook method already is a GET"
        )

    logger.warn("validation listening at GET", url, "with token", config.token)

    server.get(url, (req, res, next) => {
        if (!config.token || config.token === req.params.hub.verify_token) {
            logger.success("responding challenge at GET", url)
            return res.end(req.params.hub.challenge)
        }

        logger.error("failed challenge at GET", url)
        res.end("nope")
    })
}
