import { Server } from "socket.io";
import { Server as HttpServer } from 'http';
import { Express } from "express";

class WebSocket { 
    io: Server;

    constructor(server: HttpServer) {
        this.io = new Server(server, {
            cors: {
                origin: "http://localhost:5173"
            }
        });
    } 

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('a user connected');

            // handle vote
            socket.on('vote', (data) => {
                socket.broadcast.emit('newVote', data)
                console.log(data);
            })
        })
    }
}

export default WebSocket;