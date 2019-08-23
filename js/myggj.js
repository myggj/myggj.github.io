Bmob.initialize("528ef28ba75c6243", "Pylory");

function showAllProblem() {
	var query = Bmob.Query('myggj_problem');
	query.order("pid");
	query.find().then(res => {
		for (var i = 0; i < res.length; i++) {
			var myDetail =
				"<li class='list-group-item listContent'>" +
				"<h4>" + res[i].pid + "、" + res[i].question + "</h4>" +
				"<p class='mt-4'>" + res[i].answer + "</p>" +
				"</li>";
			$("#myProblem").append(myDetail);
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
			var myDetail =
				"<li class='list-group-item' id='problem" + res[i].pid + "'>" +
				"<div class='input-group mb-3'>" +
				"<input type='number' class='form-control col-sm-1' value='" + res[i].pid + "'>" +
				"<input type='text' class='form-control' value='" + res[i].question + "'>" +
				"</div><div class='input-group mb-3'>" +
				"<textarea class='form-control'>" + res[i].answer + "</textarea>" +
				"</div>" +
				"<button type='button' class='btn btn-primary' onclick='editSaveProblem(this.value)' value='" + res[i].pid +
				"'>保存</button>" +
				"<button type='button' class='btn btn-secondary' onclick='editDeleteProblem(this.value)' value='" + res[i].pid +
				"'>删除</button>" +
				"</li>";
			$("#myEditProblem").append(myDetail);
		}
	}).catch(err => {
		console.log(err)
	})
}

function editSaveProblem(value) {
	var idValue = $("#problem" + value + " input:eq(0)").val();
	var questionValue = $("#problem" + value + " input:eq(1)").val();
	var answerVaule = $("#problem" + value + " textarea").val();
	var query = Bmob.Query('myggj_problem');
	query.equalTo("pid", "==", Number(value));
	query.find().then(res => {
		query.get(res[0].objectId).then(res => {
			res.set('pid', Number(idValue))
			res.set('question', questionValue)
			res.set('answer', answerVaule)
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
			// console.log(res)
		}).catch(err => {
			console.log(err)
		})
	});
}

function editNewProblem() {
	var idNewValue = $("#myNewId").val();
	var questionNewValue = $("#myNewQuestion").val();
	var answerNewVaule = $("#myNewAnswer").val();
	// var isHotNewValue = $("#isHot checkbox:checked").val();
	// console.log(isHotNewValue);
	if(!isEmpty(questionNewValue)&&!isEmpty(answerNewVaule)){
		var query = Bmob.Query('myggj_problem');
		query.set("pid", Number(idNewValue))
		query.set("question", questionNewValue)
		query.set("answer", answerNewVaule)
		// query.set("is_hot", 1)
		query.save().then(res => {
			console.log(res)
			alert("新建成功")
		}).catch(err => {
			console.log(err)
		})
	}else{
		alert("皮？")
	}

}

function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
