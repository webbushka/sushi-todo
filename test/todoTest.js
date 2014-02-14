var assert = require('assert'),
	_ = require('underscore'),
	EventEmitter2 = require('eventemitter2').EventEmitter2,
	Nodeject = require('nodeject'),
	noop = function () {};

_.str = require('underscore.string');

var Store = (function () {
	'use strict';
	return {
		create: function () {
			var cache = {};
			return {
				get: function (key) {
					return cache[key];
				},
				set: function (key, value) {
					cache[key] = value;
				},
				remove: function (key) {
					delete cache[key];
				}
			};
		}
	};
})();

describe('Todo operations', function () {
	var TodoOperation = require('../app/js/operations/todoOperation.js');
	var store = Store.create();
	var ops = null;

	beforeEach(function () {
		ops = TodoOperation.create(_, store);
	});

	describe('Testing init function', function () {
		describe('Tests on new todo list', function () {
			it('should return an object', function () {
				ops.init(function (err, data) {
					assert.equal(err, null, err);
					assert.ok(_.isObject(data), 'should be an object');
				});
			});

			it('the object should should contain empty todo array', function () {
				ops.init(function (err, data) {
					assert.equal(err, null, err);
					assert.ok(_.isArray(data.todos), 'should be an array');
					assert.ok(_.isEmpty(data.todos), 'todos should be empty');
				});
			});

			it('should contain the tab values', function () {
				ops.init(function (err, data) {
					assert.equal(data.tabAll, true, 'should be true');
					assert.equal(data.tabActive, false, 'should be false');
					assert.equal(data.tabCompleted, false, 'should be false');
				});
			});

		});

		describe('Tests on existing list', function () {
			before(function () {
				store.set('todo', {
					todos: [1]
				});
			});

			after(function () {
				store.remove('todo');
			});

			it('the array shouldn\'t get overwritten', function () {
				ops.init(function (err, data) {
					assert.equal(err, null, err);
					assert.equal(data.todos[0], 1, 'the first value should be 1');
				});
			});
		});
	});

	describe('Testing updateStats function', function () {
		before(function () {
			store.set('todo', {
				todos: [{
					id: '1',
					title: 'test todo item 1',
					isEditing: false,
					isCompleted: false
				}, {
					id: '2',
					title: 'test todo item 2',
					isEditing: false,
					isCompleted: true
				}]
			});
		});

		after(function () {
			store.remove('todo');
		});

		describe('Tests on creation of nodes based on completions', function () {
			it('should return an object with a complete node', function () {
				ops.updateStats(function (err, data) {
					console.log(data);
				});
			});
		});
	});

	describe('Testing saveNew function', function () {
		it('should create a new todo item', function () {
			var value = 'test todo item';
			ops.saveNew(value, function (err, data) {
				assert.equal(err, null, err);
				assert.equal(data.todos[0].title, value, 'the value should equal ' + value);
			});
		});

		it('should throw an error due to blank item', function () {
			ops.saveNew(null, function (err, data) {
				assert.equal(err, 'A todo needs to have a value!', 'a valueless call should throw an error');
			});
		});
	});
});
