const http = require('http');
const express = require('express');
const _ = require('lodash');

const app = express();

app.use(express.static('public'))

app.get("/", function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 3000;

const server = http.createServer(app)
               .listen(port, function(){
                console.log('Listening on port ' + port + '.');
               });

const socketIo = require('socket.io');
const io = socketIo(server);

var votes = {};

io.on('connection', function(socket){
  console.log("A user has connected", io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCast', "You voted " + message + " !!!")
      socket.emit('voteCount', _.countBy(votes))
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', _.countBy(votes))
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });


});

module.exports = server;