'use strict';

/**
 * @ngdoc function
 * @name gameFlowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gameFlowApp
 */
 angular.module('gameFlowApp')
 	.controller('MainCtrl', ['$scope', 'GameData', function($scope, GameData) {
 	  GameData.get().then(function(response) {
 	 		$scope.gameData = response;
 	 	});
    $scope.playDetails = {
      final: true,
      homeScore: 115,
      awayScore: 120,
      description: 'Hover the game event markers below for play-by-play details'
    };
    $scope.setPlayDetails = function(play, $event) {
      var element = $event.target;
      var currentTransform = element.getAttribute('transform');
      if(currentTransform !== null) {
        var newTransform = currentTransform + 'translate(0, 30)';
        element.setAttribute('transform', newTransform);
      }
      element.setAttribute('stroke-width', 6);
      $scope.playDetails.final = false;
      $scope.playDetails = play;
    };
    $scope.resetMarker = function($event) {
      var element = $event.target;
      var currentTransform = element.getAttribute('transform');
      if(currentTransform !== null) {
        var newTransform = currentTransform.replace(/translate\(.*\)/, '');
        element.setAttribute('transform', newTransform);
      }
      element.setAttribute('stroke-width', 1);
    };
 	}
 ]);
