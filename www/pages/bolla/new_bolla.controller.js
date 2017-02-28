(function() {
  'use strict';

  angular.module('estimationCalculator')
          .filter('html',function($sce){
              return function(input){
                  if(typeof(input) == String )
                    return $sce.trustAsHtml(input);
                  else
                    return input;
              }
          })

          .controller('NewBolla', NewBolla);

  NewBolla.$inject = ['$localStorage', '$rootScope', '$ionicPopup', '$scope', 'changePlayerName',
                      'playerCall',
                      'playerCollect', 'roundService', 'scoreCalculator'];

  function NewBolla($localStorage, $rootScope, $ionicPopup, $scope, changePlayerName, playerCall,
                      playerCollect, roundService, scoreCalculator)
  {
    var vm = this;
    $scope.$emit('showBack',true);

    vm.players = [];
    vm.rounds = [];
    vm.currentRound = 0;

    if(!$localStorage.bollas)
      $localStorage.bollas = [];

    for(var i=0; i < 4; i++)
    {
      vm.players[i] = {name: 'Player '+(i+1), score: 0};
    }

    roundService.initRound(vm.rounds, vm.currentRound, vm.players);
    $localStorage.bollas[$localStorage.bollas.length] =
      {rounds: vm.rounds, players: vm.players, startDate: new Date()};

    vm.initRound = function(i)
    {
      roundService.initRound(vm.rounds, vm.currentRound, vm.players);
      vm.saveBolla();
    }

    vm.newRound = function()
    {
      vm.currentRound = roundService.newRound(vm.rounds, vm.currentRound);
      vm.saveBolla();
    }
    vm.playRound = function()
    {
      roundService.playRound(vm.rounds, vm.currentRound);
      vm.saveBolla();
    }
    vm.changeName = function(index)
    {
      changePlayerName.changeName(vm.players[index]).then(function(res){
        vm.players[index].name = res.playerName;
        vm.rounds[vm.currentRound].players[index].name = res.playerName;
        console.log(vm.rounds[vm.currentRound]);
        vm.saveBolla();
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
          vm.saveBolla();
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
          vm.saveBolla();
        });
      }
    }

    vm.checkRoundEnd = function()
    {
      var flag = true;
      var lamat = 0;
      for(var i=0; i < vm.rounds[vm.currentRound].players.length; i++)
      {
        lamat += vm.rounds[vm.currentRound].players[i].currentCollected;
        if(vm.rounds[vm.currentRound].players[i].currentCollected == -1)
        {
          flag = false;
        }
      }
      if(flag == true && lamat != 13)
      {
        vm.rounds[vm.currentRound].state = 2;
        //calculate sa3ayda
        //only winner
        //only looser
        scoreCalculator.endRoundCalculation(vm.rounds[vm.currentRound]);
        scoreCalculator.calculateKingKooz(vm.rounds[vm.currentRound].players);
      }
      else if(lamat == 13)
      {
        roundService.validateCollected(lamat);
      }
      vm.saveBolla();
    }

    vm.resetRound = function()
    {
      roundService.resetRound(vm.rounds, vm.currentRound);
      vm.saveBolla();
    }

    vm.saveBolla = function()
    {
      $localStorage.bollas[$localStorage.bollas.length-1] =
        {rounds: vm.rounds, players: vm.players,
          startDate: $localStorage.bollas[$localStorage.bollas.length-1].startDate};
    }

  }

})();
