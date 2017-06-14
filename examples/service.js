const NewIssues = require("./trigger")

module.exports = {
    id: "github",
    name: "Github",
    webhook_config: {
        url: "/github",
        method: "POST",
        validateIncomingQuery: ({ getParams, body, headers }) => true,
        formatter({ getParams, body, headers }) {
            return body
        },
        hooks: {
            pre() {},
            post() {},
        },
    },
    triggers: [NewIssues],
    actions: [],
}
