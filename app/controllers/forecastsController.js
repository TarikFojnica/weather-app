App.controller('forecastsController', function ($scope, Data) {
	$scope.forecasts = {};
	$scope.getTodayForecasts = function (lat, lng) {

		//call the service
		Data.todayForecast(lat, lng)
			.then(function (data) {
				$scope.forecasts.currently = data.currently;

				//we want data for the 12 hours only
				$scope.forecasts.hourly = data.hourly.data.slice(0, 12);
				console.log(data)

			}, function (error) {
				console.log('Todays forecasts error' + error)
			});
	};

	//call default
	$scope.getTodayForecasts('43.8563', '18.4131');


	$scope.switch = 'today';

	$scope.convertUnix = function (UNIX_time) {
		var a = new Date(UNIX_time * 1000);
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();

		var time = hour;

		return time;
	}
});