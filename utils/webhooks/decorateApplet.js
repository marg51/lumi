module.exports = applet => {
    const webhook = Object.assign(
        {},
        applet.service.webhook_config,
        applet.trigger.webhook_config,
        applet.webhook_config
    )

    const config = Object.assign({}, applet.config, { webhook })

    return Object.assign({}, applet, { config })
}
