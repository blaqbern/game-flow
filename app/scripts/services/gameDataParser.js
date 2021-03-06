'use strict';

angular.module('gameFlowApp')
  .factory('GameDataParser', ['strToSec', function(strToSec) {
    return {
      parse: function(data) {
        // stats.nba.com returns  an array of headers and an array of arrays of values,
        // instead of an array of objects. So these constants map to the indexes of the
        // corresponding values
        // relevant game data headers
        var EVENTMSGTYPE = 2;
        var PERIOD = 4;
        var PCTIMESTRING = 6;
        var HOMEDESCRIPTION = 7;
        var NEUTRALDESCRIPTION = 8;
        var VISITORDESCRIPTION = 9;
        var SCORE = 10;

        var MIN_PER_QUARTER = 12;
        var MIN_PER_OT = 5;
        var SEC_PER_MIN = 60;

        var gameEvents, periods, totalGameTime, parsed;

        gameEvents = data.resultSets[0].rowSet;
        periods = gameEvents[gameEvents.length - 1][PERIOD];
        totalGameTime = function(periods) {
          var gameLength = 4 * MIN_PER_QUARTER * SEC_PER_MIN;
          if(periods > 4) {
            gameLength += (periods - 4) * (MIN_PER_OT * SEC_PER_MIN);
          }
          return gameLength;
        }(periods);

        var getPeriodArray = function(periods) {
          var p = {};
          for(var i = 1; i <= periods; i++) {
            if(i < 5) {
              p['Q' + i] = {};
              p['Q' + i].start = i * 720 - 720;
              p['Q' + i].length = 720;
            }
            else {
              p['OT' + (i - 4)] = {};
              p['OT' + (i - 4)].start = 720 * 4 + (i-4) * 300 - 300;
              p['OT' + (i - 4)].length = 300;
            }
          }
          console.log(p);
          return p;
        };

        parsed = {
          gameId: gameEvents[0][0],
          periods: getPeriodArray(periods),
          totalGameTime: totalGameTime,
          largestLead: 0,
          events: []
        };

        var homeScore = 0;
        var awayScore = 0;
        var largestLead = 0;

        var getElaspedSeconds = function(event) {
          if(event.period > 4) {
            return (4 * MIN_PER_QUARTER + (event.period - 4) * MIN_PER_OT) * SEC_PER_MIN - event.gameClock;
          } else {
            return event.period * MIN_PER_QUARTER * SEC_PER_MIN - event.gameClock;
          }
        };
        var buildDescriptionString = function(eventRaw) {
          var descriptions = [
            eventRaw[HOMEDESCRIPTION],
            eventRaw[NEUTRALDESCRIPTION],
            eventRaw[VISITORDESCRIPTION]
          ];
          var desc;
          for(var i = 0; i < descriptions.length; i++) {
            if(descriptions[i]) {
              if(desc) {
                desc += ', ' + descriptions[i];
              } else {
                desc = descriptions[i];
              }
            }
          }
          return desc;
        };
        var scoringEventIndex = 0;
        for(var i = 0; i < gameEvents.length; i++) {
          var eventData, event;

          eventData = gameEvents[i];

          if(eventData[SCORE] &&
            eventData[EVENTMSGTYPE] !== 12 &&
            eventData[EVENTMSGTYPE] !== 13) {
            parsed.events[scoringEventIndex] = {};
            event = parsed.events[scoringEventIndex];
            scoringEventIndex++;

            event.period = eventData[PERIOD];
            event.gameClock = strToSec(eventData[PCTIMESTRING]);
            event.totalElaspsedSeconds = getElaspedSeconds(event);
            event.description = buildDescriptionString(eventData);

            var score, lead;

            score = eventData[SCORE].split(' - ');
            awayScore = score[0];
            homeScore = score[1];

            event.homeScore = homeScore;
            event.awayScore = awayScore;
            event.margin = awayScore - homeScore;
            lead = Math.abs(event.margin);
            if(lead > largestLead) {
              largestLead = lead;
            }
          }
        }
        parsed.largestLead = largestLead;
        return parsed;
      }
    };
  }]);
