var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));
/*app.use(express.static(__dirname + '/public'))*/

/*serve html file*/
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var users = [
	{
		'id': 21,
		'username': 'Bob',
		'firstname': 'Bob',
		'lastname': 'Jones',
		'age': 35
	},
	{
		'id': 23,
		'username': 'Mike',
		'firstname': 'Mike',
		'lastname': 'Smith',
		'age': 32
	},
	{
		'id': 24,
		'username': 'Josh',
		'firstname': 'Josh',
		'lastname': 'George',
		'age': 31
	}
];

app.get ('/users', function(req, res) {
	res.json(users);
})

app.get ('/users/:id', function(req, res) {
	var getID = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: getID});
	res.json(foundUser);
})	

app.post ('/users', function(req, res) {
	var newUser = req.body;

	users.push(newUser)
	res.json(newUser);
});

app.put('/users/:id', function(req, res){
	var targetID = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetID})
	foundUser.username = req.body.username;
	foundUser.firstname = req.body.firstname;
	foundUser.lastname = req.body.lastname;
	foundUser.age = parseInt(req.body.age);
	res.json(targetID);
});

app.delete('/users/:id', function(req, res){
	var targetID = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetID})
	var index = users.indexOf(foundUser);
	users.splice(index, 1);
	res.json(foundUser);


});

app.listen(3000);

