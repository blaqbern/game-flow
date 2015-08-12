'use strict';

angular.module('gameFlowApp')
	.filter('abs', function() {
		return function(number) {
			return Math.abs(number);
		};
	});
