const logger = require("../../../utils/log.js").createLogger("slack/utils/rtm")
const slack = require("slack")

const bot = slack.rtm.client()

const pool = {}

module.exports = function ({ token }, onEvent = () => { }) {
    if (!pool[token]) {
        pool[token] = []

        bot.started(function (payload) {
            logger.warn("connection started")
            onEvent({
                type: "started",
                payload
            })
        })

        bot.listen({ token: token }, () => {
            bot.ws.on('message', function message(data) {
                let json = JSON.parse(data)
                // logger.log(json.type, json.channel)
                pool[token].map(onEvent => onEvent(json))
            })
        })
    }

    pool[token].push(onEvent)
}
