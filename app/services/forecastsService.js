App.factory('Data', function ($http, $q) {

	return {
		getTodayForecast: function (latitude, longitude) {

			return $http.get('https://api.forecast.io/forecast/d8ab77870812de67277ae47d3e9bf83e/' + latitude + ',' + longitude)
				.then(function (response) {
					if (typeof response.data === 'object') {
						return response.data;
					} else {
						// invalid response
						return $q.reject(response.data);
					}

				}, function (response) {
					// something went wrong
					return $q.reject(response.data);
				});
		}
	}
});