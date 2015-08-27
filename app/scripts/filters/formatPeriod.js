'use strict';

angular.module('gameFlowApp')
	.filter('formatPeriod', function() {
		return function(period) {
			var p;
			if(period <= 4) {
				p = 'Q' + period;
			}
			else {
				var otNum = period - 4;
				p = 'OT' + otNum;
			}
			return p;
		};
	});
