'use strict';

/**
 * @ngdoc function
 * @name gameFlowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gameFlowApp
 */
 angular.module('gameFlowApp')
 	.controller('MainCtrl', ['$scope', 'GameData', 'GameDataParser', function($scope, GameData, GameDataParser) {
 		GameData.get().then(function(response) {
 			$scope.gameData = GameDataParser.parse(response.data);
 		});
 	}
 ]);
