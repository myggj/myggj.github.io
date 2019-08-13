Bmob.initialize("528ef28ba75c6243", "Pylory");

function showAllProblem() {
	var query = Bmob.Query('myggj_problem');
	query.find().then(resp => {
		for (var i = 0; i < resp.length; i++) {
			var myDetail =
				"<li class='list-group-item listContent'>" +
				"<h4>" + resp[i].id + "、" + resp[i].question + "</h4>" +
				"<p class='mt-4'>" + resp[i].answer + "</p>" +
				"</li>";
			$("#myProblem").append(myDetail);
		}
		// console.log(resp.length);
	}).catch(err => {
		console.log(err)
	})
}
