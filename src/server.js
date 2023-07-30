const express = require("express");

const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const socket = require("socket.io");

const http = require("http");

const server = http.createServer(app);

const PORT = 3000;

const cors = require("cors");

const io = socket(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// mongoose
//   .connect("")
//   .then(() => {
//     console.log("Connected to DB.");
//   })
//   .catch((e) => [console.log(e)]);

app.use(bodyParser.json({ urlEncoded: true }));

io.on("connection", (socket) => {
  console.log("User connected to socket.");

  socket.on("message", (data) => {
    console.log("data is ", data);
    socket.broadcast.emit("message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Connected to server at port ${PORT}`);
});
