const serverlessExpress = require('@vendia/serverless-express')
const {app, setEndpoint} = require('./app')

setEndpoint("");

const server = serverlessExpress.createServer(app)

exports.handler = (event, context) => serverlessExpress.proxy(server, event, context)