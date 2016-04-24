'use strict';

angular.module('gameFlowApp')
  .factory('GameData', ['$http', 'GameDataParser', function($http, GameDataParser) {
    return {
      get: function() {
        // var data, info, parsed;
        // data = $http.get('games/game2.json');
        // info = $http.get('games/infoGame2.json');
        //
        // $q.all([data, info]).then(function(responses) {
        //   parsed = GameDataParser.parse(responses[0], responses[1]);
        //   console.log(responses[0]);
        // });
        // console.log(parsed);
        // return parsed;
        return $http.get('games/game2.json').then(function(response) {
          return GameDataParser.parse(response.data);
        });
      }
    };
  }]);
