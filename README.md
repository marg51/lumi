# IFTTT simplified clone

## create workflows in response to events

This is a prototype, there is no signup/login process, all tokens need to be hard coded into `.env`

## example

send a slack message and a push notification whenever a commit is pushed to github

```javascript
const GithubService = require("../examples/service")
const NewPushTrigger = require("../services/github/triggers/push")
const SlackMessageAction = require("../services/slack/actions/new-message")
const PushNotificationAction = require("../services/ios/actions/push-notification")

module.exports = {
    service: GithubService, // listens to github webhooks
    trigger: NewPushTrigger, // every time a commit is pushed
    actions: [SlackMessageAction, PushNotificationAction], // send a slack message and a push notification
    config: {
        [NewPushTrigger.id]: {
            // basic filtering
            repo: "networklocum/bart",
            branch: "master",
        },
        [SlackMessageAction.id]: {
            // slack config
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
```

<img width="751" alt="screen shot 2017-06-14 at 19 54 26" src="https://user-images.githubusercontent.com/543507/27149395-51ab47dc-513b-11e7-8941-b4494d4b0a68.png">

![image](https://user-images.githubusercontent.com/543507/27149442-876e8b9a-513b-11e7-8398-564946c15a8b.png)