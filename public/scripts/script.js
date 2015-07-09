$(function() {



	

	$.get('/users', function (data) {
		var allUsers = data;

		var userID
		var template = _.template($('newUserTemplate').html());


		_.each(allUsers, function(id, username, firstname, lastname, age) {
			var $userHtml = $(template(user));


			$('newUserList').append($userHtml);
		});

	})


	/*end syntax below*/
})