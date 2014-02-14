function pojoClone(item) {

	return JSON.parse(JSON.stringify(item));
}

function getRandomChar() {
	var chars, rand;
	chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	rand = Math.floor(Math.random() * chars.length);
	return chars.substring(rand, rand + 1);
}

var TodoOperation = (function () {
	return {
		create: function (_, store, ajax) {
			if (!store.get('todo')) {
				store.set('todo', {});
			}

			return (function () {
				return {
					init: function init(done) {
						var scope = store.get('todo') || {};

						// -- if there aren't any todos create an empty array
						if (!('todos' in scope)) {
							scope.todos = [];
						}

						if (!('tabAll' in scope) || !('tabActive' in scope) || !('tabCompleted' in scope)) {
							scope.tabAll = true;
							scope.tabActive = false;
							scope.tabCompleted = false;
						}

						store.set('todo', scope);

						done(null, pojoClone(scope));
					},

					updateStats: function getStats(done) {
						var scope = store.get('todo') || {};

						scope.completed = _.where(scope.todos, {
							isCompleted: true
						}).length;

						scope.remaining = _.where(scope.todos, {
							isCompleted: false
						}).length;

						scope.hasCompleted = scope.completed > 0;
						scope.inflection = scope.remaining === 1 ? 'item' : 'items';
						scope.allAreDone = 'todos' in scope && scope.todos.length >= 1 && scope.remaining === 0;

						store.set('todo', scope);

						if (scope.tabActive === true) {
							scope.todos = _.where(scope.todos, {
								isCompleted: false
							});
						}
						else if (scope.tabCompleted === true) {
							scope.todos = _.where(scope.todos, {
								isCompleted: true
							});
						}

						done(null, pojoClone(scope));
					},

					showAll: function showAll(done) {
						var scope = store.get('todo') || {};

						// -- set active tab
						scope.tabAll = 'selected';
						scope.tabActive = null;
						scope.tabCompleted = null;

						store.set('todo', scope);

						done(null, pojoClone(scope));
					},

					showActive: function showActive(done) {
						var scope = store.get('todo') || {};

						// -- set active tab
						scope.tabAll = null;
						scope.tabActive = 'selected';
						scope.tabCompleted = null;

						store.set('todo', scope);

						scope.todos = _.where(scope.todos, {
							isCompleted: false
						});

						done(null, pojoClone(scope));
					},

					showCompleted: function showCompleted(done) {
						var scope = store.get('todo') || {};

						// -- set active tab
						scope.tabAll = null;
						scope.tabActive = null;
						scope.tabCompleted = 'selected';

						store.set('todo', scope);

						scope.todos = _.where(scope.todos, {
							isCompleted: true
						});

						done(null, pojoClone(scope));
					},

					saveNew: function saveNew(value, done) {
						var scope = store.get('todo') || {},
							id = getRandomChar() + getRandomChar();

						if (!value || _.str.trim(value) === '') {
							return done('A todo needs to have a value!', null);
						}

						if (!('todos' in scope)) {
							scope.todos = [];
						}

						while (_.findWhere(scope.todos, {
							id: id
						})) {
							id = id + getRandomChar();
						}

						scope.todos.push({
							id: id,
							title: value,
							isEditing: false,
							isCompleted: false
						});

						store.set('todo', scope);

						done(null, pojoClone(scope));
					},

					toggleAll: function toggleAll(state, done) {
						var scope = store.get('todo') || {};

						if (!('todos' in scope)) return done(null, pojoClone(scope));

						_.each(scope.todos, function (el, i, list) {
							el.isCompleted = state;
						});

						store.set('todo', scope);

						done(null, pojoClone(scope));
					},

					toggleOne: function toggleOne(state, id, done) {
						var scope = store.get('todo') || {},
							todo = _.findWhere(scope.todos, {
								id: id
							});

						todo.isCompleted = state;

						store.set('todo', scope);

						done(null, pojoClone(scope));
					},

					clearAll: function clearAll(done) {
						var scope = store.get('todo') || {};

						scope.todos = _.reject(scope.todos, function (obj) {
							return obj.isCompleted === true;
						});

						store.set('todo', scope);

						done(null, pojoClone(scope));
					},

					edit: function edit(id, done) {
						var scope = store.get('todo') || {},
							todo = _.findWhere(scope.todos, {
								id: id
							});

						todo.isEditing = true;

						store.set('todo', scope);

						done(null, pojoClone(scope));
					},

					saveEdit: function saveEdit(value, id, done) {
						var scope = store.get('todo') || {},
							todo = _.findWhere(scope.todos, {
								id: id
							});

						todo.title = value;
						todo.isEditing = false;

						store.set('todo', scope);

						done(null, pojoClone(scope));
					},

					destroy: function destroy(id, done) {
						var scope = store.get('todo') || {};

						scope.todos = _.reject(scope.todos, function (obj) {
							return obj.id === id;
						});

						store.set('todo', scope);

						done(null, pojoClone(scope));
					}
				};
			})();
		}
	};
})();

module.exports = TodoOperation;
