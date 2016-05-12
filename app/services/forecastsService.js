App.factory('Data', function ($http, $q) {

	return {
		todayForecasts: function (latitude, longitude) {

			return $http.get('https://weather-app-server.herokuapp.com/forecasts/?lat=' + latitude + '&lng=' + longitude)
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
			return $http.get('https://weather-app-server.herokuapp.com/forecasts/past-days/?lat=' + latitude + '&lng=' + longitude)
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