// [no-format]
// -- Browser Script
(function (win, $, tmpls, routie) {

	// -- load utilities
	var Nodeject = require('nodeject'),
		container = new Nodeject(),
		app = require('./app.js'),
		_ = require('underscore'),

		// -- configure all the modules
		InitConfigure = require('./config/init.js').configure(container);

	// -- define utilities
	container.define({ name : 'jquery',		type : function () { return $; }, singleton: true })
		.define({ name : '_',				type : function () { return _; }, singleton : true })
		.define({ name : 'templates',		type : function () { return tmpls; }, singleton: true })
		.define({ name : 'routie',		type : function () { return routie; }, singleton: true })
		.define({ name : 'app',				type : app.create, singleton : true, deps: ['templates'] })
		.define({ name : 'bus',				type : function (app) { return app.bus; }, singleton: true, deps: ['app'] })
		.define({ name : 'store',			type : function (app) { return app.store; }, singleton: true, deps: ['app'] })
		.define({ name : 'ajax',			type : require('./utilities/request.js'), singleton: true, deps: ['jquery'] })
		.define({ name : 'bootstrap',		type: function (app, ajax){
			app.presenters = container.resolve({ category : 'presenters', format : 'literal' });
			app.controllers = container.resolve({ category : 'controllers', format : 'literal' });

			app.container = container;
			app.noop = function (){};
			app.ajax = ajax;

			// Init app
			app.bus.emit('app::init', function (err, result) {
				if(err) return new Error(err);
				// reset routie on reload
				var hash = document.location.hash;
				document.location.hash = "";
				if(hash !== "#/") document.location.hash = hash;
			});


			return app;
		}, deps: ['app', 'ajax',]
	});

	// -- for Production
	// container.resolve('bootstrap');

	// -- for Dev
	if (!('app' in win)) {
		win.app = container.resolve('bootstrap');
		win.app.container = container;
		win.app.noop = function (){};
	}

	if (!('require' in win)) {
		win.require = require;
	}

	if(!('_' in win)) {
		win._ = _;
	}

})(window, jQuery, templates, routie);
