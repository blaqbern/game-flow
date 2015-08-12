'use strict';

angular.module('gameFlowApp')
	.factory('GameData', ['$http', function($http) {
		return {
			get: function() {
				return $http.get('games/game2.json');
			}
		};
	}]);
