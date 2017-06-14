const GithubService = require("../examples/service")
const NewIssueTrigger = require("../examples/trigger")
const SlackMessageAction = require("../services/slack/actions/new-message")

module.exports = {
    service: GithubService,
    trigger: NewIssueTrigger,
    actions: [SlackMessageAction],
    config: {
        // [NewIssueTrigger.id]: {
        //     repo: "marg51/testing-git-webhook",
        // },
        [SlackMessageAction.id]: {
            template: "a new issue #<%=number%> has been opened on <%=repository.full_name%>",
            channel: "G0YDU2X47",
            token: process.env.SLACK_TOKEN,
        },
    },
}
