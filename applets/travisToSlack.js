const TravisService = require("../services/travis")
const OnBuildTrigger = require("../services/travis/triggers/successful-build")
const SlackMessageAction = require("../services/slack/actions/new-message")

module.exports = {
    service: TravisService,
    trigger: OnBuildTrigger,
    actions: [SlackMessageAction],
    config: {
        [OnBuildTrigger.id]: {
            repository: {
                name: "networklocum/nginx-service",
            },
        },
        [SlackMessageAction.id]: {
            template: 'a new build has just finished on <%=repository.name%>, "<%=message%>"(<%=committer_name%>)',
            channel: "G0YDU2X47",
            token: process.env.SLACK_TOKEN,
        },
        debug: true,
    },
}
