const InstagramService = require("../services/instagram")
const AnyInstaTrigger = require("../services/instagram/triggers/any")
const LogAction = require("../services/uto/actions/log")

module.exports = {
    service: InstagramService,
    trigger: AnyInstaTrigger,
    actions: [LogAction],
    config: {},
}
