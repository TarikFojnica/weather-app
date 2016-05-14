App.factory('Data', function ($http, $q) {

	return {
		getForecasts: function (url, lat, lng) {

			return $http.get(url + '/?lat=' + lat + '&lng=' + lng)
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