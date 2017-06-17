require("dotenv").config()

const logger = require("../utils/log").createLogger("demo")

const applet = require("../applets/newIssueToSlack")
const applet2 = require("../applets/newCommitToSlack")
const applet3 = require("../applets/anyWebhookToSlack")
const applet4 = require("../applets/travisToSlack")

const webhook_register = require("../utils/webhooks/register")

webhook_register(applet)
webhook_register(applet2)
webhook_register(applet3)
webhook_register(applet4)
