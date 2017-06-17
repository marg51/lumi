module.exports = {
    id: "travis:build-successful",
    type: "webhook", // "action"
    service: "travis",
    name: "Successful Build",
    ingredients: ["number"],
    extract_ingredients: ({ body }) => {
        return body
    },
    webhook_config: {
        _filters: [
            ({ body, config = { repo: "" } }) =>
                body.repository.name.indexOf(config.repo) >= 0,
        ],
    },
}
