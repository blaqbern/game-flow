'use strict';

angular.module('gameFlowApp')
	.filter('arcLeftEndpoint', function() {
		return function(scoringEvent) {
      return [
        scoringEvent.totalElaspsedSeconds - 5, // 5 is the radius of the circle decoration
        (function(event) {
          return (Math.abs(event.margin) * 20) - Math.sqrt(3) / 2; // event.margin - Math.sqrt(3) / 2;
        }(scoringEvent))
      ].join(' ');
		};
	})
	.filter('arc', function() {
		return function(scoringEvent) {
      return [
        10,
        10,
        0,
        1,
        0,
        scoringEvent.totalElaspsedSeconds + 5,
        (function(event) {
          return (Math.abs(event.margin) * 20) - Math.sqrt(3) / 2; // event.margin - Math.sqrt(3) / 2;
        }(scoringEvent))
      ].join(', ');
		};
	})
  .filter('setDirection', function(){
    return function(scoringEvent) {
      return scoringEvent.margin <= 0 ? 'rotate(180 ' + scoringEvent.totalElaspsedSeconds + ' 0)' : '';
    };
  });
