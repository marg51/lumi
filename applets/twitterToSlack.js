const TwitterService = require("../services/twitter")
const AnyInstaTrigger = require("../services/twitter/triggers/any")
const LogAction = require("../services/uto/actions/log")

module.exports = {
    service: TwitterService,
    trigger: AnyInstaTrigger,
    actions: [LogAction],
    config: {},
}
