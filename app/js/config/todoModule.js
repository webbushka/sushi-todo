var TodoModule = (function () {
	return {
		configure: function (container) {
			container.define({
				name: 'todoOperation',
				type: require('../operations/todoOperation.js').create,
				category: 'operations',
				singleton: true,
				deps: ['_', 'store', 'ajax']
			})
				.define({
					name: 'todoController',
					type: require('../controllers/todoController.js').create,
					category: 'controllers',
					deps: ['_', 'bus', 'todoOperation']
				})
				.define({
					name: 'todoPresenter',
					type: require('../presenters/todoPresenter.js').create,
					category: 'presenters',
					deps: ['jquery', '_', 'bus', 'templates', 'routie']
				});
		}
	};
})();

module.exports = TodoModule;
