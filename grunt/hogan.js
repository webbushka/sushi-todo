module.exports = {
	publish: {
		options: {
			namespace: 'templates',
			prettify: true
		},
		files: {
			'./app/js/templates.js': ['./templates/*.mustache', './templates/**/*.mustache']
		}
	},

	dev: {
		options: {
			namespace: 'templates',
			prettify: true
		},
		files: {
			'./tmp/js/templates.js': ['./templates/*.mustache', './templates/**/*.mustache']
		}
	}
};
