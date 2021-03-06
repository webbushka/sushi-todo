module.exports = {
	css: {
		files: [{
			expand: true,
			cwd: 'app/',
			src: ['style/**/*.css'],
			dest: 'tmp/'
		}]
	},

	dev: {
		files: [{
			expand: true,
			cwd: 'app/',
			src: ['**/*'],
			dest: 'tmp/'
		}, {
			expand: true,
			cwd: './',
			src: ['bower_components/**'],
			dest: 'tmp/'
		}]
	},

	dist: {
		files: [{
			expand: true,
			cwd: 'tmp/',
			src: ['index.html', 'img/**'],
			dest: 'release/'
		}]
	},

	index: {
		files: {
			'tmp/index.html': 'app/index.html'
		}
	}
};
