const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { 
      method:['get','post'],
      locals:'http://localhost:8000/', // for local
      credentials:true
    }
});
io.on('connection', (socket) => {
    console.log('connection');
    socket.on('sendChatToServer', (message) => {
        console.log(message);
        io.sockets.emit('sendChatToClient', message);
    });
    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
});

server.listen(3000, () => {
  console.log('Server is running --port 3000');
}); //for local