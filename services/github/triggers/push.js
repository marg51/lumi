const match = require("../../../utils/match")

module.exports = {
    id: "github:push",
    type: "webhook", // "action"
    service: "github",
    name: "New Commit",
    ingredients: ["number"],
    extract_ingredients: ({ body }) => {
        return body
    },
    webhook_config: {
        _filters: [
            ({ headers, body, config }) =>
                headers["x-github-event"] === "push" && match(body, config),
        ],
    },
}
