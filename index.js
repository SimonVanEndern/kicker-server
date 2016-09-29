var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = require('./db');

var connection = require('./tinkerforgeconnection');
//console.log(connection.md);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true
})); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('*', function (req, res, next) {
  console.log(req.url);
  next();
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/best', function (req, res) {
  res.send(db.getBests());
});

app.post('/save', function (req, res) {
  var game = req.body.game;
  res.send({status: "ok"});
  console.log(Object.keys(req.body.game));
  db.saveGame(game.sieger, game.verlierer, game.toreVerlierer, game.time);
});

// app.post('/goal', function (req, res) {
// 	console.log('got goal');
// 	console.log(req.body);
// 	res.send(null);
// });

io.on('connection', function(socket){
	console.log("User connected");
  	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
    	io.emit('feedback', 'Thanks for messaging me');
  	});
  	socket.on('hello', function () {
  		console.log('hello');
  	});
  	// setInterval(function() {
  	// 	io.emit('random', 'text');
  	// 	console.log('random');
  	// }, 3000);
	connection.motionListener(function () {
		console.log('Listening to listener');
		io.emit('motion');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});