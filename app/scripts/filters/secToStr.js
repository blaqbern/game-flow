'use strict';

angular.module('gameFlowApp')
	.filter('secToStr', function() {
		return function(seconds) {
			var s = seconds % 60;
			if(s < 10) {
				s = '0' + s;
			}
			var m = parseInt(seconds / 60);
			return m + ':' + s;
		};
	});
