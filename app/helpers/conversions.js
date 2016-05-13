App.factory('ConvertData', function () {
	return {
		unixToDate: function (value) {
			var a = new Date(value * 1000);
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
		},

		fahrenheitToCelsius: function (value) {
			return ((value - 32) * (5 / 9)).toFixed(1);
		}
	}
});