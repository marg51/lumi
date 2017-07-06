module.exports = {
    id: "twitter:all-events",
    type: "webhook", // "action"
    service: "twitter",
    name: "All events",
    extract_ingredients: ({ body }) => {
        return body
    },
    webhook_config: {},
}
