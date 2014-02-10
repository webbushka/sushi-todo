function getTmpl(tmpl) {
	return './templates/' + tmpl + '.mustache';
}

var TodoPresenter = (function () {
	var jQueryEvents = function jQueryEvents($, _, bus, tmpl) {
		// -- Create a new item
		$(document).on('keyup', '#new-todo', function (evt) {
			var value = $(this).val();
			if (evt.keyCode !== 13 || $.trim(value) === "") return false;
			bus.emit('todo::save::new', value, function (err, result) {
				bus.emit('app::render', err, result, function () {
					$('#new-todo').focus();
				});
			});
		});

		// -- Toggle all items status
		$(document).on('change', '#toggle-all', function () {
			var state = $(this).prop('checked');
			bus.emit('todo::toggle::all', state, function (err, result) {
				bus.emit('app::render', err, result);
			});
		});

		// -- Clear completed items
		$(document).on('click', '#clear-completed', function () {
			bus.emit('todo::clear', function (err, result) {
				bus.emit('app::render', err, result);
			});
		});

		// -- Edit todo
		$(document).on('dblclick', '.edit-todo', function () {
			var id = $(this).data('todo');
			bus.emit('todo::edit', id, function (err, result) {
				bus.emit('app::render', err, result, function () {
					$('.edit').focus();
				});
			});
		});

		// -- Save edited todo
		$(document).on('keyup blur', '.edit', function (evt) {
			if (evt.type === 'keyup' && evt.keyCode !== 13) return false;
			var $self = $(this),
				id = $self.data('todo'),
				value = $self.val();

			bus.emit('todo::save::edit', value, id, function (err, result) {
				bus.emit('app::render', err, result);
			});
		});

		// -- Remove todo
		$(document).on('click', '.destroy', function () {
			var id = $(this).data('todo');
			bus.emit('todo::destroy', id, function (err, result) {
				bus.emit('app::render', err, result);
			});
		});

		// -- Toggle single item
		$(document).on('change', '.toggle', function () {
			var $self = $(this),
				state = $self.prop('checked'),
				id = $self.data('todo');

			bus.emit('todo::toggle::one', state, id, function (err, result) {
				bus.emit('app::render', err, result);
			});
		});
	};

	var busEvents = function busEvents($, _, bus, tmpl) {
		// -- Render the application on load
		bus.on('app::render', function (err, result, cb) {
			if (err) return new Error(err);
			$('.app-root').html(tmpl[getTmpl('app')].render(result, {
				'todo-partial': tmpl[getTmpl('todo-partial')]
			}));
			if (typeof cb === 'function') {
				cb();
			}
		});

		// -- Handle 404
		bus.on('app::404', function () {
			$('.app-root').html(tmpl[getTmpl('404')].render());
		});
	};

	var routes = function routes(bus, routie) {
		routie('/', function () {
			bus.emit('todo::show::all', function (err, result) {
				bus.emit('app::render', err, result);
			});
		});

		routie('/active', function () {
			bus.emit('todo::show::active', function (err, result) {
				bus.emit('app::render', err, result);
			});
		});

		routie('/completed', function () {
			bus.emit('todo::show::completed', function (err, result) {
				bus.emit('app::render', err, result);
			});
		});

		routie('/404', function () {
			bus.emit('app::404', function () {});
		});

		routie('*', function () {
			if (document.location.hash === "") {
				routie('/');
			}
			else {
				routie('/404');
			}
		});
	};

	return {
		create: function ($, _, bus, tmpl, routie) {
			// -- Handle all jQuery events
			jQueryEvents($, _, bus, tmpl);
			// -- Handle all bus events
			busEvents($, _, bus, tmpl);
			// -- Handle routes
			routes(bus, routie);

			return {
				setup: true
			};
		}
	};
})();

module.exports = TodoPresenter;
