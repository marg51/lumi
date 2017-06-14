const NewIssues = require("./triggers/new-issue")

module.exports = {
    id: "github",
    name: "Github",
    webhook_config: {
        url: "/github",
        method: "POST",
    },
    triggers: [NewIssues],
    actions: [],
}
