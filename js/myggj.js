Bmob.initialize("528ef28ba75c6243", "Pylory");

// showDropdown
var query = Bmob.Query('myggj_dropdown');
query.order("ddid");
query.find().then(res => {
	new Vue({
		el: '#myDropdownContent',
		data: {
			myDropdownItems: res
		}
	})
}).catch(err => {
	console.log(err)
})
// showNavbar
var query = Bmob.Query('myggj_navbar');
query.order("nid");
query.find().then(res => {
	new Vue({
		el: '#myNavbarContent',
		data: {
			myNavbarItems: res
		}
	})
}).catch(err => {
	console.log(err)
})
