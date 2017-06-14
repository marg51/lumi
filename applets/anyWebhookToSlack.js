const UtoService = require("../services/uto")
const AnyTrigger = require("../services/uto/triggers/any")
const SlackMessageAction = require("../services/slack/actions/new-message")
const PushNotificationAction = require("../services/ios/actions/push-notification")

module.exports = {
    service: UtoService,
    trigger: AnyTrigger,
    actions: [SlackMessageAction, PushNotificationAction],
    config: {
        [SlackMessageAction.id]: {
            template: "<%=message%>",
            channel: "G0YDU2X47",
            token: process.env.SLACK_TOKEN,
        },
        [PushNotificationAction.id]: {
            template: "<%=message%>",
            token: process.env.IOS_PUSH_TOKEN,
        },
    },
}
