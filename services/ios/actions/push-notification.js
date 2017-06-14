const logger = require("../../../utils/log").createLogger("slack/new-message")

const createTemplate = require("lodash").template
const sendPushNotification = require("../utils/send-push-notification")

module.exports = {
    id: "ios:push-notification",
    exec(applet, ingredients, config = { token }) {
        const { token } = config
        const compiled_template = createTemplate(config.template)

        sendPushNotification({
            message: compiled_template(ingredients),
            token,
        })
    },
}
