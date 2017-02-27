(function() {
  'use strict';

  angular.module('estimationCalculator')
          .controller('NewBolla', NewBolla);

  NewBolla.$inject = ['$ionicPopup', '$scope', 'changePlayerName', 'playerCall',
                      'playerCollect', 'roundService', 'scoreCalculator'];

  function NewBolla($ionicPopup, $scope, changePlayerName, playerCall,
                      playerCollect, roundService, scoreCalculator)
  {
    var vm = this;
    vm.players = [];
    vm.rounds = [];
    vm.currentRound = 0;

    for(var i=0; i < 4; i++)
    {
      vm.players[i] = {name: 'Player '+(i+1), score: 0, isKing: false, isKooz: false};
    }

    vm.initRound = function(i)
    {
      roundService.initRound(vm.rounds, vm.currentRound, vm.players);
    }

    roundService.initRound(vm.rounds, vm.currentRound, vm.players);

    vm.newRound = function()
    {
      vm.currentRound = roundService.newRound(vm.rounds, vm.currentRound);
    }
    vm.playRound = function()
    {
      roundService.playRound(vm.rounds, vm.currentRound);
    }
    vm.changeName = function(index)
    {
      changePlayerName.changeName(vm.players[index]).then(function(res){
        vm.players[index].name = res.playerName;
        vm.rounds[vm.currentRound].players[index].name = res.playerName;
        console.log(vm.rounds[vm.currentRound]);
      });
    }

    vm.playerClick = function(round, index)
    {
      //calls
      if(vm.rounds[round].state == 0)
      {
        playerCall.playerCall(vm.rounds[round], index).then(function(res){
          vm.rounds[round].players[index].currentCall = res.call;
          vm.rounds[round].players[index].currentColor = res.color;
          scoreCalculator.calculateRoundCalls(vm.rounds[round]);
          console.log(vm.rounds[round]);
        });
      }
      //scores
      else if(vm.rounds[round].state == 1)
      {
        playerCollect.playerCollect(vm.rounds[round], index).then(function(res){
          vm.rounds[round].players[index].currentCollected = res.call;
          vm.rounds[round].players[index].currentScore =
            scoreCalculator.calculatePlayerScore(vm.rounds, vm.currentRound, index);
          //if last player change state to 2, declare king and kooz
          vm.checkRoundEnd();
        });
      }
    }

    vm.checkRoundEnd = function()
    {
      var flag = true;
      for(var i=0; i < vm.rounds[vm.currentRound].players.length; i++)
      {
        if(vm.rounds[vm.currentRound].players[i].currentCollected == -1){
          flag = false;
        }
      }
      if(flag == true)
      {
        vm.rounds[vm.currentRound].state = 2;
        scoreCalculator.calculateKingKooz(vm.rounds[vm.currentRound].players);
      }
    }

    vm.resetRound = function()
    {
      roundService.resetRound(vm.rounds, vm.currentRound);
    }

  }

})();
