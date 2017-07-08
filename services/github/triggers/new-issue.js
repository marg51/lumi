const match = require("../../../utils/match")

module.exports = {
    id: "github:issue-opened",
    type: "webhook", // "action"
    service: "github",
    name: "New Issue",
    extract_ingredients: ({ body }) => {
        return body
    },
    webhook_config: {
        _filters: [
            ({ headers, body, config = { repo: "" } }) =>
                headers["x-github-event"] === "issues" &&
                body.action == "opened" &&
                match(body, config),
        ],
    },
}
