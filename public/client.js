
var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Number of connected users: ' + count;
});

var statusMessage = document.getElementById('your-vote');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message + ' on socket ' + socket.id;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCast', function (message) {
  statusMessage.innerText = message;
});

var votesList = document.getElementById('vote-list');

socket.on('voteCount', function (votes) {
  var votesToRender = "Current votes";
  for (var vote in votes) {
    votesToRender = votesToRender
                    + '<li>' + vote
                    + ' : ' + votes[vote]
                    + '</li>';
  };
  votesList.innerHTML = votesToRender;
});