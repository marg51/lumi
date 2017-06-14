const anyTrigger = require("./triggers/any")

module.exports = {
    id: "github",
    name: "Github",
    webhook_config: {
        url: "/any",
        method: "POST",
    },
    triggers: [anyTrigger],
    actions: [],
}
