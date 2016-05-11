App.controller('forecastsController', function ($scope, Data) {

	//initializing the forecasts object
	$scope.forecasts = {};
	$scope.location = {};
	$scope.location.city = 'Sarajevo';
	var last30Dates = [];
	//default forecast selection
	$scope.switch = 'today';

	function getLast30Dates() {
		var _last30Dates = [];
		for (var i = 0; i <= 29; i++) {
			//taking unix time of each day in the last 30 days and storing it in the 'last30Dates' array
			_last30Dates.push(Math.floor((moment().subtract(i, 'days')) / 1000));

			if (i >= 29) {
				last30Dates = _last30Dates;
				console.log(last30Dates)
			}
		}
	}

	getLast30Dates();

	$scope.updateLocation = function (cityName) {
		Data.getGeoInfo(cityName)
			.then(function (data) {
				$scope.location.lat = data.results[0].geometry.location.lat;
				$scope.location.lng = data.results[0].geometry.location.lng;
				$scope.location.city = data.results[0].address_components[0].long_name;

				$scope.getTodayForecasts($scope.location.lat, $scope.location.lng);
				$scope.location.value = '';

			}, function (error) {
				console.log('Todays forecasts error' + error)
			});
	};
	//getting the today's forecasts
	$scope.getTodayForecasts = function (lat, lng) {
		//call the service
		Data.todayForecasts(lat, lng)
			.then(function (data) {
				$scope.forecasts.currently = data.currently;
				$scope.forecasts.hourly = data.hourly.data;

			}, function (error) {
				console.log('Todays forecasts error' + error)
			});
	};

	//function for converting unix time
	$scope.convertUnixToDate = function (UNIX_time) {
		var a = new Date(UNIX_time * 1000);
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();

		return {
			onlyHours: hour,
			onlyDate: date
		};
	};
	//convert fahrenheit to celsius
	$scope.convertFahrenheit = function (value) {
		return ((value - 32) * (5 / 9)).toFixed(1);
	};

	//calling default data
	$scope.getTodayForecasts('43.8563', '18.4131');

});