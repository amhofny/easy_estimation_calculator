(function() {
  'use strict';

  angular.module('estimationCalculator')
          .factory('playerCall', PlayerCall);

  PlayerCall.$inject = ['$ionicPopup', '$rootScope', '$q'];

  function PlayerCall($ionicPopup, $rootScope, $q)
  {
    return {
      playerCall: playerCall
    };

    function playerCall(round, index)
    {
      var deferred = $q.defer();
      $rootScope.data = {playerName: round.players[index].name};
      var myPopup = $ionicPopup.show({
        templateUrl: 'components/player_call/player_call.template.html',
        title: $rootScope.data.playerName + ' Call',
        rootScope: $rootScope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e)
            {
              if (!$rootScope.data.call) {
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
