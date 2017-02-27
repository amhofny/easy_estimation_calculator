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
        if(players[i].currentCall == -1){
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
        if(players[i].currentCollected == -1){
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
      rounds[currentRound] = {round: currentRound+1, state: 0, underOver: 0, date: new Date()};
      //colors and double round
      if(rounds.length == 14)
      {
        rounds[currentRound].round = currentRound+'D';
      }
      else if(rounds.length == 15)
      {
        rounds[currentRound].round = '&#9728;';
      }
      else if(rounds.length == 16)
      {
        rounds[currentRound].round = '&spades;';
      }
      else if(rounds.length == 17)
      {
        rounds[currentRound].round = '&hearts;';
      }
      else if(rounds.length == 18)
      {
        rounds[currentRound].round = '&diams;';
      }
      else if(rounds.length == 19)
      {
        rounds[currentRound].round = '&clubs;';
      }
      console.log('init round: ' + rounds[currentRound].round);
      rounds[currentRound].players = [];
      for(var j=0; j < players.length; j++)
      {
        rounds[currentRound].players[j] = {name: players[j].name, currentCall: -1, risk: '',
                                    currentScore: 0, currentCollected: -1, currentColor: ''};
      }
    }
  }
})();
