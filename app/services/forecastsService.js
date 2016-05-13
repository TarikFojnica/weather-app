App.factory('Data', function ($http, $q) {
	var apiLocation = 'http://weatherappserver-63259.onmodulus.net';

	return {
		todayForecasts: function (latitude, longitude) {

			return $http.get(apiLocation + '/forecasts/?lat=' + latitude + '&lng=' + longitude)
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
		},

		last30DaysForecasts: function (latitude, longitude) {
			return $http.get(apiLocation + '/forecasts/past-days/?lat=' + latitude + '&lng=' + longitude)
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
		},

		getGeoInfo: function (cityName) {
			return $http.get('http://maps.google.com/maps/api/geocode/json?address=' + cityName)
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