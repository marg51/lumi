const logger = require("../../../utils/log").createLogger(
    "ios/utils/new-push-notification"
)

const request = require("request")

module.exports = ({ message, token }) => {
    request.post({
        url: "https://exp.host/--/api/v2/push/send",
        json: {
            to: token,
            sound: "default",
            body: message,
        },
    })
}
