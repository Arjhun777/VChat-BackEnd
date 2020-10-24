"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _http = _interopRequireDefault(require("http"));
var _socket = _interopRequireDefault(require("socket.io"));
var _uuid = require("uuid");

const app = (0, _express.default)();
const serve = _http.default.Server(app);
const io = (0, _socket.default)(serve);
const port = process.env.PORT || 5000;

// Middlewares
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({ extended: true }));

app.get('/join', (req, res) => {
  res.send({ link: (0, _uuid.v4)() });
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
    });
  });
});

// Server listen initilized
serve.listen(port, () => {
  console.log(`Listening on the port ${port}`);
}).on('error', e => {
  console.error(e);
});
//# sourceMappingURL=server.js.map