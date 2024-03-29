const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
app.use(express.json ());

const server = http.createServer(app);

server.listen(3001, () =>{
    console.log("Server is running ")
})
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET",  "POST"],
    }
})

io.on("connection", (socket) =>{
    console.log(`User connected: ${socket.id}`)

  
    socket.on("join_room", (data) =>{
        socket.join(data)
        console.log(`User joined room: ${data}`)
    })

    socket.on("send_message", (data) =>{
        console.log(data)
        socket.to(data.room).emit("receive_message",data.content)
    })
    // socket.on("send_message", (data) =>{
    //     socket.broadcast.emit("receive_message",data)
    // })
    socket.on("disconnect" , () =>{
        console.log(`User disconnected`)
    })
     
})

