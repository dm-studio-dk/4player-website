module.exports = function (config) {
    config.module.rules[0].exclude =
        /(node_modules|bower_components)\/(?!podparse)/
    return config
}
