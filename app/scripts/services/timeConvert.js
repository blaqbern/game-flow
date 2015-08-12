'use strict';

angular.module('gameFlowApp')
	.factory('TimeConvert', function() {
		return {
			strToSec: function(timeString) {
				var timeComponents = timeString.split(':');
				return parseInt(timeComponents[0]) * 60 + parseInt(timeComponents[1]);
			},
			secToStr: function(seconds) {
				var s = seconds % 60;
				var m = parseInt(seconds / 60);
				return m + ':' + s;
			}
		};
	});
