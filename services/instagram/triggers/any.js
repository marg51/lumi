module.exports = {
    id: "instagram:all-events",
    type: "webhook", // "action"
    service: "instagram",
    name: "All events",
    extract_ingredients: ({ body }) => {
        return body
    },
    webhook_config: {},
}
