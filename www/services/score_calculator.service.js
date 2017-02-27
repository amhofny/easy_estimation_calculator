(function() {
  'use strict';

  angular.module('estimationCalculator')
          .factory('scoreCalculator', ScoreCalculator);

  ScoreCalculator.$inject = [];

  function ScoreCalculator()
  {
    return {
      calculatePlayerScore: calculatePlayerScore,
      calculateKingKooz: calculateKingKooz,
      calculateRoundCalls: calculateRoundCalls
    };

    function calculateKingKooz(players)
    {
      var high, low;
      high = players[0];
      low = players[0];
      for(var i=0; i < players.length; i++)
      {
        players[i].isKing = false;
        players[i].isKooz = false;
        if(players[i].score > high.score)
          high = players[i];
        if(players[i].score < low.score)
          low = players[i];
      }
      high.isKing = true;
      low.isKooz = true;
    }
    function calculatePlayerScore(rounds, currentRound, playerIndex)
    {
      var player = rounds[currentRound].players[playerIndex];
      var prevScore = 0;
      if(currentRound > 0)
        prevScore = rounds[currentRound-1].players[playerIndex].score;
      //check if he has call or not, check dash call, check dash, check normal call, check 8,9,10,11,12,13
      //change state to 2 if all players score entered
      calculateKingKooz
      var players = rounds[currentRound].players;
      if(player.currentCollected == player.currentCall)
        return prevScore + 10;
      else
        return prevScore - 10;
    }

    function calculateRoundCalls(round)
    {
      //check all player called
      var flag = true;
      var count = 0;
      var playerCalled;
      for(var i=0; i < round.players.length; i++)
      {
        count += round.players[i].currentCall;
        if(round.players[i].currentColor != '' && round.players[i].currentColor != undefined)
          playerCalled = i;
        if(round.players[i].currentCall == -1)
          flag = false;
      }
      if(flag == true){
        //calculate risk
        var last = (i+3)%4;
        if((count-13)%2 == 0)
        {
          round.players[last].risk = (count-13) + 'R';
        }
        //calculate overUnder
        round.underOver = count - 13;

      }
    }
  }
})();
