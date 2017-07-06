// const NewIssues = require("./triggers/new-issue")

module.exports = {
    id: "instagram",
    name: "Instagram",
    webhook_config: {
        url: "/insta",
        method: "POST",
        pubsubhubbub_validation_config: {
            token: "who-named-that-protocol",
        },
    },
    triggers: [],
    actions: [],
}

// register webhook https://www.instagram.com/developer/subscriptions/
// curl -F 'client_id=CLIENT_ID' \
//      -F 'client_secret=CLIENT_SECRET' \
//      -F 'object=user' \
//      -F 'aspect=media' \
//      -F 'verify_token=who-named-that-protocol' \
//      -F 'callback_url=https://lumi.uto.io/insta' \
//      https://api.instagram.com/v1/subscriptions/
