// @ts-check

const logger = require("../log.js").createLogger("webhooks/registerCrc")

const crypto = require("crypto")

// @todo validate incoming query, see https://dev.twitter.com/webhooks/securing
module.exports = function registerCrc(server, method, url, config) {
    if (method == "get")
        return logger.error(
            "can't register validation due to webhook method already is a GET"
        )

    if (typeof config.secret !== "string")
        return logger.error(
            "a secret must be passed to the crc config and must be a string, not",
            typeof config.secret
        )

    logger.warn("validation listening at GET", url)

    server.get(url, (req, res, next) => {
        const hmac = crypto.createHmac("sha256", config.secret)

        hmac.update(req.params.crc_token)
        res.end({ response_token: hmac.digest("hex") })
    })
}
