const restify = require("restify")

const server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser())

module.exports = port => {
    server.listen(port, function() {
        console.log("%s listening at %s", server.name, server.url)
    })

    return server
}
