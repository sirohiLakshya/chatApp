const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('user joined', (username) => {
    io.emit('user joined', username);
  });

  socket.on('chat message', ({ username, message }) => {
    socket.broadcast.emit('chat message', { username, message });
  });

  socket.on('file upload', ({ username, fileName, fileData }) => {
    socket.broadcast.emit('file upload', { username, fileName, fileData });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
