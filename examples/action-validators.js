function PromisifyValue(value) {
    return new Promise((resolve, reject) => {
        value ? resolve(value) : reject(value)
    })
}

exports.hasIosApp = {
    test: User => !!User.settings.ios_device_token,
    error_message: () => "No IOS app found",
}
