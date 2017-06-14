const { hasIosApp } = require("./action-validators")

module.exports = {
    id: "notifications:push",
    requires: [hasIosApp],
    isValid: () => true,
    hooks: {
        pre() {},
        post() {},
    },
    exec() {
        return new Promise((resolve, reject) => {})
    },
}
