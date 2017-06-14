const GithubService = require("../examples/service")
const NewPushTrigger = require("../services/github/triggers/push")
const SlackMessageAction = require("../services/slack/actions/new-message")

module.exports = {
    service: GithubService,
    trigger: NewPushTrigger,
    actions: [SlackMessageAction],
    config: {
        [NewPushTrigger.id]: {
            repo: "networklocum/bart",
            branch: "master",
        },
        [SlackMessageAction.id]: {
            template: "new commit #<%=head_commit.message%> has been pushed to <%=repository.full_name%> by <%=head_commit.author.username%>",
            channel: "G0YDU2X47",
            token: process.env.SLACK_TOKEN,
        },
    },
}
