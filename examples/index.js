require("dotenv").config()

const logger = require("../utils/log").createLogger("demo")

const applet = require("../applets/newIssueToSlack")
const applet2 = require("../applets/newCommitToSlack")
const applet3 = require("../applets/anyWebhookToSlack")
const applet4 = require("../applets/travisToSlack")
const applet5 = require("../applets/instaToSlack")
const applet6 = require("../applets/twitterToSlack")
const applet7 = require("../applets/emojiToSlack")

const webhook_register = require("../utils/webhooks/register")


// webhook_register(applet)
webhook_register(applet2)
webhook_register(applet3)
webhook_register(applet4)
// webhook_register(applet5)
// webhook_register(applet6)
webhook_register(applet7)


const CHANNEL_LYON = "G0L33CV98"
const USER_FABIEN = "U0L2ARSE7"
const USER_BUZZ = "U63MJF9EE"

const createSlackResponses = require("./createSlackResponses")
const stream_register = require("../utils/streams/register")

stream_register(require("../applets/atToEmoji"))
stream_register(require("../applets/game"))

const registerSlack = (config, template, scheduler) => stream_register(createSlackResponses(config, template, scheduler))

const registerFabien = (text, template, scheduler) => registerSlack({ type: "message", channel: CHANNEL_LYON, text, user: USER_FABIEN }, template, scheduler)

registerFabien("yo", "Yo Fabinou bien bien ou bien? La forme pour cette nouvelle journée? nice moi aussi")
registerFabien("re", "re petit fabien! =D")
registerFabien("nice", "Lyon")
registerFabien("naze", "= Fabien")
registerFabien("noob", "leretourdemoi")
registerFabien("nap", "cimer")
registerFabien("nope", "dommage")
registerFabien("=|", "=D")
registerFabien("oO", "Oo")

registerSlack({ type: "message", text: { $in: [/ping/, /pong/] }, user: { $defined: true } }, "pong", { throttle: 10000, getKey })
registerSlack({ type: "message", text: "whoami", user: { $defined: true } }, ({ ingredients }) => ingredients.user)
registerSlack({ type: "message", text: /debug/, user: { $defined: true } }, ({ ingredients }) => "```" + JSON.stringify(ingredients).replace(/@/g, "@ ") + "```")

registerSlack({ type: "message", text: /:.*:/, user: USER_BUZZ }, "<@buzz> C'est quoi cette attaque ridicule?", { debounce: 1000, getKey })

registerSlack({ type: "message", text: "debounce" }, "debounced", { debounce: 10000, getKey })
registerSlack({ type: "message", text: "throttle" }, "throttled", { throttle: 10000, getKey })
registerSlack({ type: "message", text: "waitCalls" }, "waited 3 calls", { waitCalls: 3, getKey })
registerSlack({ type: "message", user: USER_FABIEN }, "tg", { waitCalls: 15, getKey })

registerSlack({ type: "message", text: /buffer/, user: { $exclude: "U0L32S92B" } }, ({ context }) => context.buffer.length, { buffer: { until: ({ ingredients }) => ingredients.text.match(/release/), getKey: getKeyUser } })

function getKey(data) {
    return data.channel
}

function getKeyUser(data) {
    return data.user
}

