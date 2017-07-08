const GithubService = require("../examples/service")
const NewPushTrigger = require("../services/github/triggers/push")
const SlackMessageAction = require("../services/slack/actions/new-message")
const PushNotificationAction = require("../services/ios/actions/push-notification")

module.exports = {
    service: GithubService,
    trigger: NewPushTrigger,
    actions: [SlackMessageAction, PushNotificationAction],
    config: {
        [NewPushTrigger.id]: {
            repository: {
                full_name: "networklocum/bart"
            },
            head_commit: {
                committer: {
                    $exclude: ["marg51"]
                },
                modified: {
                    $contains: [
                        /^src\/shared/
                    ]
                }
            },
            ref: "refs/heads/master",
        },
        [SlackMessageAction.id]: {
            template: "new commit #<%=head_commit.message%> has been pushed to <%=repository.full_name%> by <%=head_commit.author.username%>",
            channel: "G0YDU2X47",
            token: process.env.SLACK_TOKEN,
        },
        [PushNotificationAction.id]: {
            template: "<%=head_commit.message%> @<%=repository.full_name%> (<%=head_commit.author.username%>)",
            token: process.env.IOS_PUSH_TOKEN,
        },
    },
}
