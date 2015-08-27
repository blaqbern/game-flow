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
    $scope.playDetails = {homeScore: 115, awayScore: 120};
    $scope.setPlayDetails = function(play) {
      $scope.playDetails = play;
    };
 	}
 ]);
