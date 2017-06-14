const logger = require("../log.js").createLogger("webhooks/register")

const { server } = require("./index")

const decorateApplet = require("./decorateApplet")
const handleQuery = require("./handleQuery")

const endpoints = {
    get: {},
    post: {},
    put: {},
    delete: {},
}

module.exports = applet => {
    applet = decorateApplet(applet)

    const { method, url } = applet.config.webhook

    const method_lc = method.toLowerCase()

    if (!endpoints[method_lc][url]) {
        const callbacks = []
        endpoints[method_lc][url] = callbacks

        registerEndpoint(method_lc, url, callbacks)
    }

    logger.log("registering new webhook applet at", method, url)
    endpoints[method_lc][url].push(handleQuery(applet))
}

function registerEndpoint(method, url, callbacks) {
    logger.warn("server is listening to new endpoint:", method, url)

    try {
        server[method](url, (...args) => {
            logger.log("received new query", method, url)

            // res.send()
            args[1].send({ ok: true })

            callbacks.map(cb => cb(...args))
        })
    } catch (e) {
        logger.error(e.message)
    }
}
