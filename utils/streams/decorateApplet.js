module.exports = applet => {
    const stream = Object.assign(
        {},
        applet.service.stream_config,
        applet.trigger.stream_config,
        applet.stream_config
    )

    const config = Object.assign({}, applet.config, { stream })

    return Object.assign({}, applet, { config })
}
