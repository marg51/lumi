const slack = require("slack")

const bot = slack.rtm.client()

module.exports = function({ token }) {
    bot.started(function(payload) {
        // console.log("payload from rtm.start", payload)
    })

    // respond to a user_typing message
    bot.emoji_changed(function(msg) {
        console.log("several people are coding", msg)
    })

    bot.listen({ token: token })
}
