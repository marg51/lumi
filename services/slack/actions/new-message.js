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
        pre() {},
        post() {},
    },
    exec(applet, ingredients, config = { token, channel, template }) {
        const { channel, token } = config
        const compiled_template = createTemplate(config.template)

        sendMessage(
            {
                text: compiled_template(ingredients),
                channel,
                token,
            },
            () => {}
        )
    },
}
