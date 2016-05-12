App.controller('forecastsController', function ($scope, Data) {

	//initializing the forecasts object and some defaults we may need in the app
	$scope.forecasts = {};
	$scope.location = {};
	$scope.location.city = 'Sarajevo';
	$scope.location.lat = '43.8563';
	$scope.location.lng = '18.4131';

	$scope.location.date = moment().format('Do MMMM YYYY');
	var last30Dates = [];
	$scope.switch = 'today';

	// Get the dates of the last 30 days by taking the advantage of Moment.js library.
	// After the date is received convert it into a Unix format and store in the array
	// so we have it ready in the memory.
	function getLast30Dates(cb) {
		var _last30Dates = [];
		for (var i = 0; i <= 29; i++) {
			//taking unix time of each day in the last 30 days and storing it in the 'last30Dates' array
			_last30Dates.push(Math.floor((moment().subtract(i, 'days')) / 1000));

			if (i >= 29) {
				last30Dates = _last30Dates;
			}
		}
	}
	getLast30Dates();

	// Get the weather forecasts of the last 30 days and store it in the array of objects.
	// Each day is an object in array.
	$scope.getLast30DaysForecasts = function (lat, lng) {
		Data.last30DaysForecasts(lat, lng)
			.then(function (data) {
				$scope.forecasts.last30Days = data;
			}, function (error) {
				console.log(error)
			});
	};

	// Update location by submitting the input form. Once the form is submitted
	// call the Google Maps Geocoding API and pass the entered value. It will return
	// coordinates of the entered place which will be used for the Weather API.
	// Reset the input field once we receive the expected data
	$scope.updateLocation = function (cityName) {
		Data.getGeoInfo(cityName)
			.then(function (data) {

				$scope.location.lat = data.results[0].geometry.location.lat;
				$scope.location.lng = data.results[0].geometry.location.lng;
				$scope.location.city = data.results[0].address_components[0].long_name;

				$scope.getTodayForecasts($scope.location.lat, $scope.location.lng);
				$scope.getLast30DaysForecasts($scope.location.lat, $scope.location.lng);

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
			onlyDay: date,
			date: date + ' ' + month + ' ' + year
		};
	};
	//convert fahrenheit to celsius
	$scope.convertFahrenheit = function (value) {
		return ((value - 32) * (5 / 9)).toFixed(1);
	};

	//calling the initial default data on the app load
	$scope.getTodayForecasts($scope.location.lat, $scope.location.lng);

});