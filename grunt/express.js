var path = require('path');

module.exports = {
	options: {
		port: 9000,
		hostname: 'localhost'
	},

	dev: {
		options: {
			bases: path.resolve('./tmp'),
			server: path.resolve('./index'),
			livereload: true
		}
	},

	dist: {
		options: {
			bases: path.resolve('./dist'),
			server: path.resolve('./index')
		}
	}
};
