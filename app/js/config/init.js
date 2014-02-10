var InitConfigure = (function () {
	return {
		configure: function (container) {
			var TodoModule = require('./todoModule.js').configure(container);
		}
	};
})();

module.exports = InitConfigure;
