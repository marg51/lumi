module.exports = {
    id: "github:issue-opened",
    type: "webhook", // "action"
    service: "github",
    name: "New Issue",
    ingredients: ["number"],
    extract_ingredients: ({ body }) => {
        return body
    },
    webhook_config: {
        _filters: [
            ({ headers, body, config = { repo: "" } }) =>
                headers["x-github-event"] === "issues" &&
                body.action == "opened" &&
                body.repository.full_name.indexOf(config.repo) >= 0,
        ],
    },
}
