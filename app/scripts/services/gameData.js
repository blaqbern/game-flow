'use strict';

angular.module('gameFlowApp')
	.factory('GameData', ['$http', 'GameDataParser', function($http, GameDataParser) {
		return {
			get: function() {
				return $http.get('games/game2.json').then(function(response) {
					return GameDataParser.parse(response.data);
				});
			}
		};
	}]);
