(function() {
  'use strict';

  angular.module('estimationCalculator')
          .factory('playerCollect', PlayerCollect);

  PlayerCollect.$inject = ['$ionicPopup', '$rootScope', '$q'];

  function PlayerCollect($ionicPopup, $rootScope, $q)
  {
    return {
      playerCollect: playerCollect
    };

    function playerCollect(round, index)
    {
      var deferred = $q.defer();
      $rootScope.data = {playerName: round.players[index].name};
      var myPopup = $ionicPopup.show({
        templateUrl: 'components/player_collect/player_collect.template.html',
        title: $rootScope.data.playerName + ' Call',
        scope: $rootScope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e)
            {
              if ($rootScope.data.call == undefined) {
                e.preventDefault();
              } else {
                return $rootScope.data;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log(res);
        if(res){
          deferred.resolve(res);
        }
      });
      return deferred.promise;
    }
  }
})();
