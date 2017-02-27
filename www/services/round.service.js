(function() {
  'use strict';

  angular.module('estimationCalculator')
          .factory('roundService', RoundService);

  RoundService.$inject = ['$ionicPopup'];

  function RoundService($ionicPopup)
  {
    return {
      resetRound: resetRound,
      playRound: playRound,
      newRound: newRound,
      initRound: initRound
    };

    function resetRound(rounds, currentRound)
    {
      //remove collected if state was equal 1
      //remove call if state was equal 0
      rounds[currentRound].state -= 1;
      if(rounds[currentRound].state < 0)
        rounds[currentRound].state = 0;

      console.log('current state: '+ rounds[currentRound].state);
    }

    function playRound(rounds, currentRound)
    {
      var players = rounds[currentRound].players;
      var play = true;
      for(var i=0; i < players.length; i++)
      {
        if(players[i].currentCall == 0){
          play = false;
          break;
        }
      }
      if(play == true)
        rounds[currentRound].state = 1;
      else
      {
        var alertPopup = $ionicPopup.alert({
         title: players[i].name + ' didn\'t call',
         template: 'Check all players calls'
       });

      }
    }

    function newRound(rounds, currentRound, players)
    {
      //check all players score entered
      var players = rounds[currentRound].players;
      var play = true;
      for(var i=0; i < players.length; i++)
      {
        if(players[i].currentCollected == 0){
          play = false;
          break;
        }
      }
      if(play == true){
        initRound(rounds, rounds.length, players);
        currentRound = rounds.length - 1;
      }
      else
      {
        var alertPopup = $ionicPopup.alert({
          title: players[i].name + ' didn\'t collect',
          template: 'Check all players collected'
        });
      }
      return currentRound;
    }

    function initRound(rounds, currentRound, players)
    {
      console.log('init round: ' + currentRound);
      rounds[currentRound] = {round: currentRound+1, state: 0, underOver: 0};
      rounds[currentRound].players = [];
      for(var j=0; j < players.length; j++)
      {
        rounds[currentRound].players[j] = {name: players[j].name, currentCall: -1, risk: '',
                                    currentScore: 0, currentCollected: -1, currentColor: ''};
      }
    }
  }
})();
