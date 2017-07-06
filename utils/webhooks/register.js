const logger = require("../log.js").createLogger("webhooks/register")

const { server } = require("./index")

const decorateApplet = require("./decorateApplet")
const handleQuery = require("./handleQuery")

const registerPubsubhubbub = require("./register_pubsubhubbub")
const registerCrc = require("./register_crc")

const endpoints = {
    get: {},
    post: {},
    put: {},
    delete: {},
}

module.exports = applet => {
    applet = decorateApplet(applet)

    const {
        method,
        url,
        pubsubhubbub_validation_config,
        crc_validation_config,
    } = applet.config.webhook

    const method_lc = method.toLowerCase()

    if (!endpoints[method_lc][url]) {
        const callbacks = []
        endpoints[method_lc][url] = callbacks

        registerEndpoint(method_lc, url, callbacks)

        if (pubsubhubbub_validation_config) {
            registerPubsubhubbub(
                server,
                method_lc,
                url,
                pubsubhubbub_validation_config
            )
        }
        if (crc_validation_config) {
            registerCrc(server, method_lc, url, crc_validation_config)
        }
    }

    logger.log("registering new webhook applet at", method, url)
    endpoints[method_lc][url].push(handleQuery(applet))
}

function registerEndpoint(method, url, callbacks) {
    logger.warn("server is listening to new endpoint:", method, url)

    try {
        server[method](url, (...args) => {
            logger.log("received new query", method, url)

            const response = callbacks.reduce(
                (state, cb) => cb(...args) || state,
                { ok: true }
            )

            // this is calling res.send()
            args[1].send(response)
        })
    } catch (e) {
        logger.error(e.message)
    }
}
