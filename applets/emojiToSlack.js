const UtoService = require("../services/slack")
const AnyTrigger = require("../services/slack/triggers/any")
const SlackMessageAction = require("../services/slack/actions/new-message")

module.exports = {
    service: UtoService,
    trigger: AnyTrigger,
    actions: [SlackMessageAction],
    config: {
        [AnyTrigger.id]: {
            type: "event_callback",
            event: {
                type: "reaction_added",
                reaction: {
                    $in: ["upside_down_face", "full_moon_with_face"]
                }
            },
        },
        [SlackMessageAction.id]: {
            template: "new emoji:  #<%=event.reaction%>",
            channel: "G0YDU2X47",
            token: process.env.SLACK_TOKEN,
        },
    },
}
