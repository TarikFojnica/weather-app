// configure our routes
app.config(function ($routeProvider) {
	$routeProvider

		.when('/', {
			templateUrl: 'components/_weatherForecast.html',
			controller: 'weatherForecastController.html'
		})

		.otherwise('/');
});
