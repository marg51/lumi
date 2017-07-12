const match = require("../../../utils/match")
const rtm = require("../utils/rtm-connection")

module.exports = {
    id: "slack:all-rtm-events",
    type: "stream", // "action"
    service: "slack",
    name: "All RTM events",
    extract_ingredients: event => event,
    stream_config: {
        start: (config, onEvent) => rtm(config, onEvent),
        _filters: ({ body, config }) => match(body, config),
    },
}
