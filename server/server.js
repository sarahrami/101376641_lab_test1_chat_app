require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const userRoutes = require('./routes/UserAuth')
const GroupMessage = require('./models/GroupMessage')


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes );

const DB_CONNECTION_STRING = process.env.MONGODB_URI;

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Failed to connect to the database.', err);
    process.exit();
});

const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User connected`);
    // joining room
    socket.on("join_room", (data) => {
        console.log('joined')
        socket.join(data)
    })
    // typing feature
    socket.on('typing', (data) => {
        socket.to(data.room).emit('user_typing', { username: data.username });
    });
    
    // sending message
    socket.on("send_message", async (data) => {
        const {from_user, room, message} = data;
        const groupMessage = new GroupMessage({
            from_user, room, message, date_sent: new Date()
        })
        console.log(data)
        await groupMessage.save();
        io.in(room).emit('send_message', {from_user, message, date_sent: groupMessage.date_sent});
        
    }) 
    // leaving room
    socket.on('leave_room', (data) => {
        socket.leave(data.room);
        io.in(data.room).emit('user_left', `${data.username} has left the room.`);

    });
    

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
