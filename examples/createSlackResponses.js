const SlackService = require("../services/slack")
const AnyTrigger = require("../services/slack/triggers/rtm")
const SlackMessageAction = require("../services/slack/actions/new-message")
const UtoLog = require("../services/uto/actions/termlog")

module.exports = (config, template, scheduler) => ({
    service: SlackService,
    trigger: AnyTrigger,
    actions: [UtoLog, SlackMessageAction],
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    },
    config: {
        scheduler,
        [AnyTrigger.id]: config,

        [SlackMessageAction.id]: {
            template,
            channel: ({ ingredients }) => ingredients.channel,
            token: process.env.SLACK_TOKEN,
        },
    },
})
