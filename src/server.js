const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()

const server = http.Server(app)
const io = socketio(server)

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-r5fax.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUsers = {

}

io.on('connection', socket => {
    const { user_id } = socket.handshake.query
    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

//GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar routes params (para edicao e delete)
// req.body = Acessar corpo da requisicao (para criacao, edicao)

//JSON VIEWER

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')))
app.use(routes)

server.listen(process.env.PORT || 3333)

