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
      calculateRoundCalls: calculateRoundCalls,
      endRoundCalculation: endRoundCalculation
    };

    function endRoundCalculation(round)
    {
      var winners = [];
      var loosers = [];
      for(var i=0; i < round.players.length; i++)
      {
        if(round.players[i].winLoose == 1)
          winners[winners.length] = round.players[i];
        else if(round.players[i].winLoose == 0)
          loosers[loosers.length] = round.players[i];
      }
      //only winner
      if(winners.length == 1)
        winners[0].currentScore += 10;
      //only looser
      if(loosers.length == 1)
        loosers[0].currentScore -= 10;
      //sa3aydah
      if(loosers.length == 4){
        round.state = 3;
        for(var i=0; i < round.players.length; i++)
        {
          round.players[i].currentScore = 'x';
        }
      }
    }
    function calculateKingKooz(players)
    {
      var high, low;
      high = players[0];
      low = players[0];
      for(var i=0; i < players.length; i++)
      {
        players[i].isKing = false;
        players[i].isKooz = false;
        if(players[i].currentScore > high.currentScore)
          high = players[i];
        if(players[i].currentScore < low.currentScore)
          low = players[i];
      }
      high.isKing = true;
      low.isKooz = true;
      console.log('king: '+high.name);
      console.log('kooz: '+low.name);
    }
    function calculatePlayerScore(rounds, currentRound, playerIndex)
    {
      var player = rounds[currentRound].players[playerIndex];
      var prevScore = 0;
      var score = 0;
      if(currentRound > 0)
        prevScore = getPrevScore(rounds, currentRound, playerIndex);
      //check if he has call or not, check dash call, check dash, check normal call, check 8,9,10,11,12,13
      //change state to 2 if all players score entered

      var players = rounds[currentRound].players;

      if(player.currentCall == 'DC')
      {
        if(player.currentCollected == 0)
        {
          if(rounds[currentRound].underOver > 0)
          {
            score = 20;
          }
          else
            score = 30;
        }
        else
        {
          if(rounds[currentRound].underOver > 0)
            score = -20;//check over or under
          else
            score = -30;
        }
      }
      else if(player.currentCall == 'D')
      {
        if(player.currentCollected == 0)
          score = 10;
        else
          score = -10;
      }
      else if(player.currentCollected == player.currentCall)
        score = 10 + player.currentCollected;
      else
        score = - 10 - Math.abs(player.currentCall - player.currentCollected);

      //has call
      if(player.currentColor != '' && player.currentColor != undefined)
      {
        if(score > 0)
          score += 10;
        else
          score -= 10;
      }
      //has risk
      if(player.risk != '')
      {
        var multiplayer = parseInt(player.risk.replace('R', ''));
        if(score > 0)
          score += 10 * multiplayer;
        else
          score -= 10 * multiplayer;
      }
      if(score > 0)
        player.winLoose = 1;
      else
        player.winLoose = 0;
      return prevScore + score;
    }

    function calculateRoundCalls(round)
    {
      //check all player called
      var flag = true;
      var count = 0;
      var playerCalled;
      for(var i=0; i < round.players.length; i++)
      {
        if(round.players[i].currentCall != 'DC' && round.players[i].currentCall != 'D')
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
          round.players[last].risk = 'R' + Math.abs(count-13) ;//+ 'R';
        else
         round.players[last].risk = '';
        //calculate overUnder
        round.underOver = count - 13;

      }
    }
    function getPrevScore(rounds, current, index)
    {
      var score = 0;
      if(current = 0)
        score = 0;
      else
      {
        while(current > 0)
        {
          current -= 1;
          var sa3aydah = 0;
          for(var i=0 ;i < rounds[current].players.length; i++)
          {
            if(rounds[current].players[i].currentScore == 'x')
              sa3aydah += 1;
          }
          if(sa3aydah == 4)
          {
            current -= 1;
          }
          else if(sa3aydah == 0)
          {
            score = rounds[current].players[index].currentScore;
          }
        }
      }
      return score;
    }
  }
})();
