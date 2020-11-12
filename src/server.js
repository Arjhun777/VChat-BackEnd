import express from 'express';
import cors from 'cors';
import server from 'http';
import socketIO from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

const app = express();
const serve = server.Server(app);
const io = socketIO(serve);
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/join', (req, res) => {
    res.send({ link: uuidV4() });
});

io.on('connection', socket => {
    console.log('socket established')
    socket.on('join-room', (userData) => {
        const { roomID, userID } = userData;
        console.log('Joinned in Room', roomID, 'user data', JSON.stringify(userData));
        socket.join(roomID);
        socket.to(roomID).broadcast.emit('new-user-connect', userData);
        socket.on('disconnect', () => {
            socket.to(roomID).broadcast.emit('user-disconnected', userID);
        });
        socket.on('broadcast-message', (message) => {
            console.log('new message received', JSON.stringify(message));
            socket.to(roomID).broadcast.emit('new-broadcast-messsage', {...message, userData});
        })
    })
});

// Server listen initilized
serve.listen(port, () => {
    console.log(`Listening on the port ${port}`);
}).on('error', e => {
    console.error(e);
});

