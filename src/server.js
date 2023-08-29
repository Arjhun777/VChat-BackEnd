import express from "express";
import cors from "cors";
import server from "http";
import { Server } from "socket.io";
import { v4 as uuidV4 } from "uuid";
// import './mailer.js';

const app = express();
const serve = server.createServer(app);
// const io = socketIO(serve);
const io = new Server(serve, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/join", (req, res) => {
  res.send({ link: uuidV4() });
});

io.on("connection", (socket) => {
  socket.on("join-room", (userData) => {
    const { roomID, userID } = userData;
    socket.join(roomID);
    // socket.to(roomID).broadcast.emit("new-user-connect", userData);
    socket.broadcast.to(roomID).emit("new-user-connect", userData);
    socket.on("disconnect", () => {
      socket.broadcast.to(roomID).emit("user-disconnected", userID);
    });
    socket.on("broadcast-message", (message) => {
      socket.broadcast.to(roomID).emit("new-broadcast-messsage", { ...message, userData });
    });
    // socket.on('reconnect-user', () => {
    //     socket.to(roomID).broadcast.emit('new-user-connect', userData);
    // });
    socket.on("display-media", (value) => {
      socket.to(roomID).broadcast.emit("display-media", { userID, value });
    });
    socket.on("user-video-off", (value) => {
      socket.to(roomID).broadcast.emit("user-video-off", value);
    });
  });
});

// Server listen initilized
serve
  .listen(port, () => {
    console.log(`Listening on the port ${port}`);
  })
  .on("error", (e) => {
    console.error(e);
  });
