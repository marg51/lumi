const { every } = require("lodash")

// is data matching this applet filters?
module.exports = (applet, data) => {
    const { _filters, filters } = applet.config.webhook

    const all_filters = [].concat(_filters).concat(filters)

    const is_valid = every(all_filters, fn => !fn || fn(data))

    return is_valid
}
