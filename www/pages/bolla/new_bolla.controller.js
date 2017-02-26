(function() {
  'use strict';

  angular.module('estimationCalculator')
  .controller('NewBolla', NewBolla);

  NewBolla.$inject = ['$ionicPopup', '$scope'];

  function NewBolla($ionicPopup, $scope)
  {
    var vm = this;
    vm.players = [];
    vm.rounds = [];
    vm.currentRound = 0;

    for(var i=0; i < 4; i++)
    {
      vm.players[i] = {name: 'Player '+(i+1), score: 0};
    }

    vm.initRound = function(i)
    {
      console.log('init round: ' + i);
      vm.rounds[i] = {round: i+1, state: 0};
      vm.rounds[i].players = [];
      for(var j=0; j < vm.players.length; j++)
      {
        vm.rounds[i].players[j] = {name: vm.players[j].name, currentCall: 0, currentCards: [],
                                    currentScore: 0, currentCollected: 0, currentColor: ''};
      }
    }
    vm.initRound(0);
    vm.newRound = function()
    {
      //check all players score entered
      vm.initRound(vm.rounds.length);
      vm.currentRound = vm.rounds.length - 1;
    }
    vm.playRound = function()
    {
      //check all players calls
      vm.rounds[vm.currentRound].state = 1;
    }
    vm.changeName = function(index)
    {
      $scope.data = {playerName: vm.players[index].name};
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.playerName">',
        title: 'Enter Player Name',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e)
            {
              if (!$scope.data.playerName) {
                e.preventDefault();
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        if(res)
          vm.players[index].name = res.playerName;
      });
    }

    vm.playerCall = function(round, index)
    {
      //check if round still in init state 0
      $scope.data = {playerName: vm.players[index].name};
      var myPopup = $ionicPopup.show({
        templateUrl: 'components/player_call/player_call.template.html',
        title: $scope.data.playerName + ' Call',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e)
            {
              if (!$scope.data.call) {
                e.preventDefault();
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log(res);
        if(res){
          vm.rounds[round].players[index].currentCall = res.call;
          vm.rounds[round].players[index].currentColor = res.color;
        }
      });
    }
  }

})();
