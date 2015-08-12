'use strict';

angular.module('gameFlowApp')
	.filter('homeLeads', function() {
		return function(margin) {
			return margin >= 0 ? 0 : margin;
		};
	});
