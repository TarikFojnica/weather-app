App.controller('forecastsController', function ($scope, Data, ConvertData) {

	//initializing the forecasts and location objects
	$scope.forecasts = {};
	$scope.location = {};

	//set defaults
	$scope.location.city = 'Sarajevo, Bosnia and Herzegovina';
	$scope.location.lat = '43.8563';
	$scope.location.lng = '18.4131';
	$scope.location.date = moment().format('Do MMMM YYYY');
	$scope.switch = 'today';

	//store the functions from the ConvertData helper into $scope.convert object
	$scope.convert = ConvertData;

	// Update location by submitting the input form. Once the form is submitted
	// call the Google Maps Geocoding API and pass the entered value. It will return
	// coordinates of the entered place which will be used for the Weather API.
	// Reset the input field once we receive the expected data
	$scope.updateLocation = function (cityName) {
		Data.getGeoInfo(cityName)
			.then(function (data) {

				$scope.location.lat = data.results[0].geometry.location.lat;
				$scope.location.lng = data.results[0].geometry.location.lng;
				$scope.location.city = data.results[0].formatted_address;

				$scope.getTodayForecasts($scope.location.lat, $scope.location.lng);
				$scope.getLast30DaysForecasts($scope.location.lat, $scope.location.lng);

				$scope.location.value = '';

			}, function (error) {
				console.log('Todays forecasts error' + error)
			});
	};

	//get the today's forecasts
	$scope.getTodayForecasts = function (lat, lng) {
		//call the service
		Data.getForecasts('http://weatherappserver-63259.onmodulus.net/forecasts', lat, lng)
			.then(function (data) {
				$scope.forecasts.currently = data.currently;
				$scope.forecasts.hourly = data.hourly.data;

			}, function (error) {
				console.log('Todays forecasts error' + error);
			});
	};

	//get the last 30 days forecasts
	$scope.getLast30DaysForecasts = function (lat, lng) {
		Data.getForecasts('http://weatherappserver-63259.onmodulus.net/forecasts/past-days', lat, lng)
			.then(function (data) {
				$scope.forecasts.last30Days = data;
			}, function (error) {
				console.log(error)
			});
	};

	//call the initial default data on the app load
	$scope.getTodayForecasts($scope.location.lat, $scope.location.lng);
});