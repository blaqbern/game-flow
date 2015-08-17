'use strict';

angular.module('gameFlowApp')
  .factory('EventMarkerSettings', function() {
    var multiplier = 20;
    var circularDecorationDiam = 15;
    return {
      setSVGParams: function() {
      },
      multiplier: function() {
        return multiplier;
      },
      setMultiplier: function(val) {
        multiplier = val;
      },
      circularDecorationDiam: function() {
        return circularDecorationDiam;
      },
      setCircularDecorationDiam: function(val) {
        circularDecorationDiam = val;
      }
    };
  });

angular.module('gameFlowApp')
  .filter('fixAspectRatio', ['EventMarkerSettings', function(EventMarkerSettings) {
    return function(gameData) {
      if(!gameData) {
        return '0 0 0 0';
      }
      var minX, minY, width, height, heightOriginal, aspectRatio, scaleFactor;
      aspectRatio = {width: 16, height: 9};

      heightOriginal = 18 * 2;
      width = gameData.totalGameTime;
      height = width * aspectRatio.height / aspectRatio.width;
      scaleFactor = height / heightOriginal;
      minX = 0;
      minY = -gameData.largestLead * scaleFactor;
      EventMarkerSettings.setMultiplier(scaleFactor);
      EventMarkerSettings.setCircularDecorationDiam(scaleFactor * 7 / 16);

      var bufferzone = 50;
      return [
        minX - bufferzone,
        minY - bufferzone,
        width + 2 * bufferzone,
        height + 2 * bufferzone
      ].join(' ');
    };
  }])
	.filter('arcLeftEndpoint', ['EventMarkerSettings', function(EventMarkerSettings) {
		return function(scoringEvent) {
      return [
        scoringEvent.totalElaspsedSeconds - EventMarkerSettings.circularDecorationDiam(),
        Math.abs(scoringEvent.margin) * EventMarkerSettings.multiplier()
      ].join(' ');
		};
	}])
	.filter('arc', ['EventMarkerSettings', function(EventMarkerSettings) {
		return function(scoringEvent) {
      return [
        EventMarkerSettings.circularDecorationDiam(),
        EventMarkerSettings.circularDecorationDiam(),
        0,
        1,
        0,
        scoringEvent.totalElaspsedSeconds + EventMarkerSettings.circularDecorationDiam(),
        Math.abs(scoringEvent.margin) * EventMarkerSettings.multiplier()
      ].join(', ');
		};
	}])
  .filter('scale', ['EventMarkerSettings', function(EventMarkerSettings) {
    return function(one) {
      return one * EventMarkerSettings.circularDecorationDiam();
    };
  }])
  .filter('setDirection', function(){
    return function(scoringEvent) {
      return scoringEvent.margin <= 0 ? 'rotate(180 ' + scoringEvent.totalElaspsedSeconds + ' 0)' : '';
    };
  });
