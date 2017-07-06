const logger = require("../../../utils/log").createLogger("uto/log")

const fs = require("fs")

module.exports = {
    id: "uto:log",
    exec(applet, ingredients) {
        const filename = `${__dirname}/../../../logs/${applet.service.id}-${applet.trigger.id}-${Date.now()}`

        fs.writeFile(
            filename,
            JSON.stringify(ingredients),
            (err, res) =>
                (err ? logger.error(err) : logger.log("logged", filename))
        )
    },
}
