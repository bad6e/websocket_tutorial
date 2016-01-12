var socket = io();

var connectionCount = document.getElementById('connection-count');
socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('voteCount', function (votes) {
  console.log(votes);
});

var buttons = document.querySelectorAll('#choices button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(){
    socket.send('voteCast', this.innerText);
  });
};