import { Server } from "socket.io"
import { Messages } from "../models/Messages.js"

export const Socket = (server) => {
    const users = []

    const io = new Server(server)

    io.on('connection', (socket) => {
        socket.on("user_connected", (username) => {
            users[username] = socket.id
    
            io.emit("user_connected", username)
        })
    
        socket.on("send_message", (data) => {
            const socketId = users[data.receiver]

            Messages.insert(data)
    
            io.to(socketId).emit("new_message", data)
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    })
}
