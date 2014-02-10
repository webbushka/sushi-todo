var request = function ($) {
	function doAjax(method, url, data, callback) {
		$.ajax(url, {
			type: method,
			async: false,
			dataType: 'jsonp',
			contentType: "application/json",
			jsonpCallback: 'jsonCallback',
			data: data,
			success: function (data) {
				callback(null, data);
			},
			error: function (xhr, options, err) {
				callback(err, null);
			}
		});
	}

	return {
		post: function (url, data, callback) {
			doAjax("POST", url, data, callback);
		},
		put: function (url, data, callback) {
			doAjax("PUT", url, data, callback);
		},
		get: function (url, callback) {
			doAjax("GET", url, null, callback);
		}
	};
};

module.exports = request;