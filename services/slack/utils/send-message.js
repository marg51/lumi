const slack = require("slack")

function updateMessage({ ts, token, channel, text, attachments }, next) {
    slack.chat.update(
        { token, ts, channel, text, attachments },
        (err, data) => {
            if (err) console.log(err)
            next(data.ts)
        }
    )
}

function createMessage({ token, channel, text, attachments }, next) {
    slack.chat.postMessage(
        { token, channel, text, attachments },
        (err, data) => {
            if (err)
                return console.log(err)

            next(data.ts)
        }
    )
}

module.exports = function sendMessage(
    { ts, token, channel, text, attachments },
    next
) {
    if (ts) updateMessage({ ts, token, channel, text, attachments }, next)
    else createMessage({ token, channel, text, attachments }, next)
}
