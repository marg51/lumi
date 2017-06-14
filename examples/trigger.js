module.exports = {
    id: "github:issue-opened",
    type: "webhook", // "action"
    service: "github",
    name: "New Issue",
    ingredients: ["number"],
    extract_ingredients: ({ headers, params, body, config }) => {
        return body
    },
    webhook_config: {
        _filters: [
            ({ body, config = { repo: "" } }) =>
                body.action == "opened" &&
                body.repository.full_name.indexOf(config.repo) >= 0,
        ],
    },
}
