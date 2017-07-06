module.exports = {
    id: "twitter",
    name: "Twitter",
    webhook_config: {
        url: "/twitter",
        method: "POST",
        crc_validation_config: {
            secret: process.env.TWITTER_API_SECRET,
        },
    },
    triggers: [],
    actions: [],
}
