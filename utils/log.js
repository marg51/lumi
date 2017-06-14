require("colors")

exports.createLogger = type => ({
    log: (...args) => console.log(`[${type}]`.gray, ...args),
    warn: (...args) => console.log(`[${type}]`.cyan, ...args),
    error: (...args) => console.log(`[${type}]`.red, ...args),
    success: (...args) => console.log(`[${type}]`.green, ...args),
})
