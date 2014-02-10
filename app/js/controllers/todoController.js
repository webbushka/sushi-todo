var TodoController = (function () {
	return {
		create: function (_, bus, ops) {
			// -- bus events go here
			bus.on('app::init', function (presenter) {
				ops.init(function (err, result) {
					bus.emit('todo::update', err, presenter);
				});
			});

			// -- Update stats
			bus.on('todo::update', function (err, presenter) {
				if (err) return new Error(err);
				ops.updateStats(presenter);
			});

			// -- Render the lists to show all
			bus.on('todo::show::all', function (presenter) {
				ops.showAll(presenter);
			});

			// -- Render the lists to show only active
			bus.on('todo::show::active', function (presenter) {
				ops.showActive(presenter);
			});

			// -- Render the lists to show only completed
			bus.on('todo::show::completed', function (presenter) {
				ops.showCompleted(presenter);
			});

			// -- Save new todo
			bus.on('todo::save::new', function (value, presenter) {
				ops.saveNew(value, function (err, result) {
					bus.emit('todo::update', err, presenter);
				});
			});

			// -- Toggle all complete
			bus.on('todo::toggle::all', function (state, presenter) {
				ops.toggleAll(state, function (err, result) {
					bus.emit('todo::update', err, presenter);
				});
			});

			// -- Toggle one complete
			bus.on('todo::toggle::one', function (state, id, presenter) {
				ops.toggleOne(state, id, function (err, result) {
					bus.emit('todo::update', err, presenter);
				});
			});

			// -- Clear completed todos
			bus.on('todo::clear', function (presenter) {
				ops.clearAll(function (err, result) {
					bus.emit('todo::update', err, presenter);
				});
			});

			// -- Edit todo
			bus.on('todo::edit', function (id, presenter) {
				ops.edit(id, presenter);
			});

			// -- Save existing todo
			bus.on('todo::save::edit', function (value, id, presenter) {
				ops.saveEdit(value, id, function (err, result) {
					bus.emit('todo::update', err, presenter);
				});
			});

			// -- Destroy todo
			bus.on('todo::destroy', function (id, presenter) {
				ops.destroy(id, function (err, result) {
					bus.emit('todo::update', err, presenter);
				});
			});
			return {
				setup: true
			};
		}
	};
})();

module.exports = TodoController;
