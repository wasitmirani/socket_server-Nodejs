


let app = require('express')();

let http = require('http').Server(app);

let io = require('socket.io')(http);
process.env.PORT=3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    io.emit('noOfConnections', Object.keys(io.sockets.connected).length)


    socket.on('disconnect', () => {
        console.log('disconnected')
        io.emit('noOfConnections', Object.keys(io.sockets.connected).length)
    })



    socket.on('chat-message', (msg, user_id) => {
        socket.broadcast.emit('chat-message', msg)
        console.log(user_id);
    })
    socket.on('joined', (name) => {
        socket.broadcast.emit('joined', name)
        console.log("join user " + name);
    })
    socket.on('leaved', (name) => {
        socket.broadcast.emit('leaved', name)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
    socket.on('stoptyping', () => {
        socket.broadcast.emit('stoptyping')
    })


})

http.listen(process.env.PORT, () => {
    console.log('Server is started at http://localhost:'+process.env.PORT)
})