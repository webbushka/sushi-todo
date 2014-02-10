var app = (function () {

	var EventEmitter2 = require("EventEmitter2").EventEmitter2;

	return {
		create: function (templates) {
			// var cache = {};
			var cache = window.localStorage;

			return {
				bus: (new EventEmitter2({
					"delimiter": "::",
					"wildcard": "*"
				})),
				store: {
					get: function (key) {
						return cache.getItem(key) ? JSON.parse(cache[key]) : {};
					},
					set: function (key, value) {
						cache.setItem(key, JSON.stringify(value));
					},
					remove: function (key) {
						cache.removeItem(key);
					}
				},
				templates: templates,
				noop: function () {}
			};
		}
	};
})();

module.exports = app;
