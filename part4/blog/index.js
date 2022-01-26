const http = require('http')
const config = require('./utils/config')
const app = require('./app')

const server = http.createServer(app)

const PORT = 3003
server.listen(config.PORT, () =>{
    console.log(`Server running on port ${config.PORT}`)
})