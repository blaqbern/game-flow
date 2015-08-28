'use strict';

angular.module('gameFlowApp')
  .factory('EventMarkerSettings', function() {
    var multiplier;
    var circularDecorationDiam;
    var bufferSize;
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
      },
      bufferSize: function() {
        return bufferSize;
      },
      setBufferSize: function(size) {
        bufferSize = size;
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
      aspectRatio = {width: 2, height: 1};

      heightOriginal = gameData.largestLead * 2;
      width = gameData.totalGameTime;
      height = width * aspectRatio.height / aspectRatio.width;
      scaleFactor = height / heightOriginal;
      minX = 0;
      minY = -gameData.largestLead * scaleFactor;
      var bufferzone = 50;
      EventMarkerSettings.setMultiplier(scaleFactor);
      EventMarkerSettings.setCircularDecorationDiam(scaleFactor * 7 / 16);
      EventMarkerSettings.setBufferSize(bufferzone);

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
  })
  .filter('graphHeight', ['EventMarkerSettings', function(EventMarkerSettings) {
    return function(gameData) {
      if(!gameData) {return '0';}
      return gameData.largestLead * EventMarkerSettings.multiplier() + EventMarkerSettings.bufferSize();
    };
  }]);
