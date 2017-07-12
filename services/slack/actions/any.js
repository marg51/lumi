const { get } = require("lodash")
const logger = require("../../../utils/log").createLogger("slack/rts")

const slack = require("../utils/slack")
module.exports = {
    id: "notifications:slack-message",
    requires: [],
    isValid: () => true,
    hooks: {
        pre() { },
        post() { },
    },
    exec(applet, ingredients, config, context) {
        const { action, payload, token } = config
        const method = get(slack, action)
        if (!method)
            return logger.error(action, "doesn't exist")

        const params = Object.assign({ token }, parseParam(payload, { applet, ingredients, config, context }))
        method(params, (err) => {
            if (err)
                return logger.error(params, err.message)
        })
    },
}

function parseParam(value, { applet, ingredients, config, context }) {
    if (typeof value == "function") {
        return value({ applet, ingredients, config, context })
    }

    return value
}
