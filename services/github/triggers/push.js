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
            ({ headers, body, config = { repo: "" } }) =>
                headers["x-github-event"] === "push" &&
                body.repository.full_name.indexOf(config.repo) >= 0 &&
                body.ref.indexOf("refs/heads/" + config.branch) >= 0,
        ],
    },
}
