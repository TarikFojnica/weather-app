App.factory('Data', function ($http, $q) {

	return {
		todayForecasts: function (latitude, longitude) {

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
		},

		last30DaysForecasts: function (latitude, longitude, date) {
			return $http.get('https://api.forecast.io/forecast/d8ab77870812de67277ae47d3e9bf83e/' + latitude + ',' + longitude + ',' + date)
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