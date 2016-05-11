// configure our routes
App.config(function ($routeProvider) {
	$routeProvider

		.when('/', {
			templateUrl: 'app/views/forecasts.html',
			controller: 'forecastsController'
		})

		.otherwise('/');
});
