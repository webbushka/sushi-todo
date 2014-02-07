module.exports = function (grunt) {

	// Load configuration from individual files in grunt dir
	require('load-grunt-config')(grunt);

	grunt.registerTask('compile', [
		'clean',
		'hogan:publish',
		'copy',
		'browserify2'
	]);

	grunt.registerTask('build', [
		'compile',
		'useminPrepare',
		'concat',
		'uglify',
		'cssmin',
		'usemin'
	]);

	grunt.registerTask('server', ['compile', 'express:dev', 'watch']);
	grunt.registerTask('server:dist', ['build', 'express:dist', 'express-keepalive']);

	grunt.registerTask('default', ['server']);
};
