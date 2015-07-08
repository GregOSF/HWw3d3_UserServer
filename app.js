var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');


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

/*app.get ('/users/:id', function(req, res) {
	var getID = parseInt(req.params.id);
	res.json(this.users.getID);
})
*/
app.post ('/users', function(req, res) {
	var newUser = req.body;

	users.push(newUser)
	res.json(newUser);

	/*var Greg = [{
		'id': 24,
		'username': 'Greg',
		'firstname': 'Greg',
		'lastname': 'Onza',
		'age': 31
	}];*/


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

