const SuccessfulBuild = require("./triggers/successful-build")

module.exports = {
    id: "travis",
    name: "Travis",
    webhook_config: {
        url: "/travis",
        method: "POST",
        transform: body =>
            JSON.parse(decodeURIComponent(body.replace("payload=", ""))),
    },
    triggers: [SuccessfulBuild],
    actions: [],
}
