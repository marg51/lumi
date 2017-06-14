const GithubService = require("./service")
const NewIssueTrigger = require("./trigger")
const PushAction = require("./action")

module.exports = {
    service: GithubService,
    trigger: NewIssueTrigger,
    actions: [PushAction],
    webhook_config: {
        filters: [],
    },
}
