import express from 'express';
import cors from 'cors';
import server from 'https';
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

// app.use(express.static('public'));
// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.redirect(`/${uuidV4()}`)
// });

// app.get(('/:room'), (req, res) => {
//     res.render('room', { roomID: req.params.room });
// })

io.on('connection', socket => {
    socket.on('join-room', (roomID, userID) => {
        console.log('Joinned in Room', roomID);
        socket.join(roomID);
        socket.to(roomID).broadcast.emit('new-user-connect', userID);
        socket.on('disconnect', () => {
            socket.to(roomID).broadcast.emit('user-disconnected', userID);
        })
    })
})

// Server listen initilized
serve.listen(port, () => {
    console.log(`Listening on the port ${port}`);
}).on('error', e => {
    console.error(e);
});
