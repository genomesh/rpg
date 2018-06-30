'use strict';
var bodyParser = require('body-parser');
var express  = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));
var server = app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port'))
})

var socket = require('socket.io');
var io = socket(server);

let users = [];

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  socket.user;
  socket.emit('asign', socket.id);
  users.push(new user(socket.id));
  console.log("New connection: " + socket.id);
  socket.on('update', msg => {
    socket.user = JSON.parse(msg);
    socket.pos = socket.user['pos'];
    for (let i=0;i<users.length;i++) {
      if (users[i].id == socket.id) {
        users[i].pos = socket.pos;
      }
    }
    console.log('user.pos: ' + socket.pos);
  });
  socket.on('disconnect', function() {
    console.log('User DC: ' + socket.id);
    for (let i=0;i<users.length;i++) {
      if (users[i].id == socket.id) {
        users.splice(i,1);
        i -= 1;
      }
    }
  });
}
//io.emit('message name','messagehere');

function user (id) {
  this.id = id;
  this.pos = [0,0];
}

function sendPos () {
  //console.log('sending');
  if (users.length > 0) {
      io.emit('update',JSON.stringify(users));
  }
}
setInterval(sendPos,25);
