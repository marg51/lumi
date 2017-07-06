require("colors")

exports.createLogger = type => ({
    log: (...args) => getEmitterFor("log")(`[${type}]`.gray, ...args),
    warn: (...args) => getEmitterFor("warn")(`[${type}]`.cyan, ...args),
    error: (...args) => getEmitterFor("error")(`[${type}]`.red, ...args),
    success: (...args) => getEmitterFor("success")(`[${type}]`.green, ...args),
})

const ignored_types = String(process.env.IGNORE_EVENTS).split(",")
const noop = () => {}

function getEmitterFor(type) {
    if (ignored_types.indexOf(type) >= 0) return noop

    return console.log
}
