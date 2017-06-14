module.exports = {
    id: "uto:any",
    type: "webhook", // "action"
    service: "github",
    name: "New Issue",
    extract_ingredients: ({ body }) => {
        return body
    },
}
