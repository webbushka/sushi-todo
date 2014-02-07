module.exports = {
	// Global options
	options: {
		livereload: true
	},

	index: {
		files: ['app/index.html'],
		tasks: ['copy:index']
	},

	css: {
		files: ['app/style/**/*.css'],
		tasks: ['copy:css'],
		options: {
			livereload: false
		}
	},

	// Livereload css files when they change in 'tmp/'
	tmpCss: {
		files: ['tmp/style/**/*.css']
	},

	scripts: {
		files: ['app/**/*.js', 'bower_components/**/*.js'],
		tasks: ['browserify2']
	},

	hogan: {
		files: ['templates/**/*.mustache'],
		tasks: ['hogan:dev']
	}
};
