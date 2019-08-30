Bmob.initialize("528ef28ba75c6243", "Pylory");

function showAllProblem() {
	var query = Bmob.Query('myggj_problem');
	query.order("pid");
	query.find().then(res => {
		for (var i = 0; i < res.length; i++) {
			if(res[i].is_hot == "1"){
				var myDetail =
					"<li class='list-group-item listContent'>" +
					"<h4>" + res[i].pid + "、" + res[i].question + "<span class='badge badge-pill badge-danger'>热</span></h4>" +
					"<p class='mt-4'>" + res[i].answer + "</p>" +
					"</li>";
				$("#myProblem").append(myDetail);
			} else {
				var myDetail =
					"<li class='list-group-item listContent'>" +
					"<h4>" + res[i].pid + "、" + res[i].question + "</h4>" +
					"<p class='mt-4'>" + res[i].answer + "</p>" +
					"</li>";
				$("#myProblem").append(myDetail);
			}
		}
	}).catch(err => {
		console.log(err)
	})
}

function loginCheck() {
	var myUserNameValue = $("#myUserName").val();
	var myPasswordValue = $("#myPassword").val();
	var isPasswordTrue = false;
	var query = Bmob.Query('myggj_user');
	query.equalTo("username", "==", myUserNameValue);
	query.find().then(res => {
		if (md5(md5(myPasswordValue)) === res[0].password) {
			$("#mySubmit").attr("data-dismiss", "modal");
			$("#mySubmit").click();
		} else {
			alert("ERROR");
		}
	});
}

function editAllProblem() {
	var query = Bmob.Query('myggj_problem');
	query.order("pid");
	query.find().then(res => {
		for (var i = 0; i < res.length; i++) {
			$("#myEditProblem").append(editSingleList(res[i].pid, res[i].question, res[i].answer));
			if(res[i].is_hot == "1"){
				$("#isHotCheckBox" + res[i].pid).attr("checked", true);
			}
		}
	}).catch(err => {
		console.log(err)
	})
}

function editSaveProblem(value) {
	var idValue = $("#problem" + value + " input:eq(0)").val();
	var questionValue = $("#problem" + value + " input:eq(1)").val();
	var answerVaule = $("#problem" + value + " textarea").val();
	var isHotNewValue = $("#isHotCheckBox" + value).is(':checked') ? "1" : "0";
	console.log(isHotNewValue);
	var query = Bmob.Query('myggj_problem');
	query.equalTo("pid", "==", Number(value));
	query.find().then(res => {
		query.get(res[0].objectId).then(res => {
			res.set('pid', Number(idValue))
			res.set('question', questionValue)
			res.set('answer', answerVaule)
			res.set("is_hot", Number(isHotNewValue))
			res.save()
			console.log(res)
			alert("修改成功")
		}).catch(err => {
			console.log(err)
		})
	});
}

function editDeleteProblem(value) {
	var query = Bmob.Query('myggj_problem');
	query.equalTo("pid", "==", Number(value));
	query.find().then(res => {
		query.destroy(res[0].objectId).then(res => {
			$("#problem" + value).css('display', 'none');
			alert("删除成功");
		}).catch(err => {
			console.log(err)
		})
	});
}

function editNewProblem() {
	var idNewValue = $("#myNewId").val();
	var questionNewValue = $("#myNewQuestion").val();
	var answerNewVaule = $("#myNewAnswer").val();
	var isHotNewValue = $("#isHotCheckBox").is(':checked') ? "1" : "0";
	// console.log(isHotNewValue);
	if (!isEmpty(idNewValue) && !isEmpty(questionNewValue) && !isEmpty(answerNewVaule)) {
		var query = Bmob.Query('myggj_problem');
		query.set("pid", Number(idNewValue))
		query.set("question", questionNewValue)
		query.set("answer", answerNewVaule)
		query.set("is_hot", Number(isHotNewValue))
		query.save().then(res => {
			// console.log(res);
			alert("新建成功");
			$("#myEditProblem").append(editSingleList(idNewValue, questionNewValue, answerNewVaule));
			$("#myNewId").val("");
			$("#myNewQuestion").val("");
			$("#myNewAnswer").val("");
			$("#isHotCheckBox").attr("checked",false);
			var h = $(document).height() - $(window).height();
			$(document).scrollTop(h);
		}).catch(err => {
			console.log(err)
		})
	} else {
		alert("皮？")
	}

}

function isEmpty(obj) {
	if (typeof obj == "undefined" || obj == null || obj == "") {
		return true;
	} else {
		return false;
	}
}

function editSingleList(id, question, answer) {
	return "<li class='list-group-item' id='problem" + id + "'>" +
		"<div class='input-group mb-3'>" +
		"<input type='number' class='form-control col-sm-1' value='" + id + "'>" +
		"<input type='text' class='form-control' value='" + question + "'>" +
		"<div class='input-group-append'><span class='input-group-text'>" +
		"<input type='checkbox' class='form-check-input ml-1' id='isHotCheckBox" + id + "'>" +
		"<label class='form-check-label col-sm-1 ml-4' for='isHotCheckBox" + id + "'>热门</label>" +
		"</span></div>" +
		"</div><div class='input-group mb-3'>" +
		"<textarea class='form-control'>" + answer + "</textarea>" +
		"</div>" +
		"<button type='button' class='btn btn-primary' onclick='editSaveProblem(this.value)' value='" + id + "'>保存</button>" +
		"<button type='button' class='btn btn-secondary' onclick='editDeleteProblem(this.value)' value='" + id + "'>删除</button>" +
		"</li>";
}
