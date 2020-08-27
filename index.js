const app = require('express')()
const http = require('http').createServer(app)


app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})

http.listen(process.env.PORT)

// let app = require("express")();

// let http = require("http").createServer(app);

// let io = require("socket.io")(http);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// io.on("connection", (socket) => {
//   io.emit("noOfConnections", Object.keys(io.sockets.connected).length);

//   socket.on("disconnect", () => {
//     console.log("disconnected");
//     io.emit("noOfConnections", Object.keys(io.sockets.connected).length);
//   });


//   // this broadcast 
//   socket.on("chat-message", (msg) => {
//     socket.broadcast.emit("chat-message", msg);
//   });


//   socket.on("joined", (name) => {
//     socket.broadcast.emit("joined", name);
//   });
//   socket.on("leaved", (name) => {
//     socket.broadcast.emit("leaved", name);
//   });

//   socket.on("typing", (data) => {
//     socket.broadcast.emit("typing", data);
//   });
//   socket.on("stoptyping", () => {
//     socket.broadcast.emit("stoptyping");
//   });
// });
// http.listen(3000);
// // http.listen(3000, () => {
// //   console.log("Server is started at http://localhost:3000");
// // });

// // http.listen(process.env.PORT);
