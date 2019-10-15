$.get('https://www.tianqiapi.com/api/?version=v1&appid=test&appsecret=test', function(resp, status) {
	if (status == 'success') {
		var weather = resp.data[0].date + " " + resp.data[0].week + " " + resp.city + " " + resp.data[0].wea + " " +
			resp.data[0].tem;
		$("#myWeather").text(weather);
	} else {
		console.log("false")
	}
}, 'json');
