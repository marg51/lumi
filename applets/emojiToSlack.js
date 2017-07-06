const UtoService = require("../services/slack")
const AnyTrigger = require("../services/slack/triggers/any")
const SlackMessageAction = require("../services/uto/actions/log")

module.exports = {
    service: UtoService,
    trigger: AnyTrigger,
    actions: [SlackMessageAction],
    config: {
        [SlackMessageAction.id]: {
            template: "<%=message%>",
            channel: "G0YDU2X47",
            token: process.env.SLACK_TOKEN,
        },
    },
}
