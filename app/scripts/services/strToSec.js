'use strict';

angular.module('gameFlowApp')
	.factory('strToSec', function() {
		return function(timeString) {
			var timeComponents = timeString.split(':');
			return parseInt(timeComponents[0]) * 60 + parseInt(timeComponents[1]);
		};
	});
