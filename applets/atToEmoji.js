const SlackService = require("../services/slack")
const AnyTrigger = require("../services/slack/triggers/rtm")
const SlackAnyAction = require("../services/slack/actions/any")
const UtoLog = require("../services/uto/actions/termlog")

module.exports = {
    service: SlackService,
    trigger: AnyTrigger,
    actions: [SlackAnyAction],
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    },
    config: {
        [AnyTrigger.id]: {
            text: /<@U5DTPL59V> :wave:/,
            user: {
                $exclude: "U5DTPL59V"
            }
        },
        [SlackAnyAction.id]: {
            action: "reactions.add",
            token: process.env.SLACK_BOT_TOKEN,
            payload: ({ ingredients }) => ({
                name: "wave",
                channel: ingredients.channel,
                timestamp: ingredients.ts
            })
        },
    },
}
