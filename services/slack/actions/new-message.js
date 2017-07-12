const logger = require("../../../utils/log").createLogger("slack/new-message")

const createTemplate = require("lodash").template
const sendMessage = require("../utils/send-message")

const token = process.env.SLACK_TOKEN
const template = "a new issue #<%=number%> has been opened"
const channel = "G0YDU2X47"

module.exports = {
    id: "notifications:slack-message",
    requires: [],
    isValid: () => true,
    hooks: {
        pre() { },
        post() { },
    },
    exec(applet, ingredients, config, context) {
        const { channel, token } = config
        const compiled_template = createTemplate(parseParam(config.template, { applet, ingredients, config, context }))

        sendMessage(
            {
                text: compiled_template(ingredients),
                attachments: ingredients.slack_attachments,
                channel: parseParam(channel, { applet, ingredients, config, context }),
                token,
            },
            () => { }
        )
    },
}

function parseParam(value, { applet, ingredients, config, context }) {
    if (typeof value == "function") {
        return value({ applet, ingredients, config, context })
    }

    return value
}
