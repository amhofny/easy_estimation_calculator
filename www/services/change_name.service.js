(function() {
  'use strict';

  angular.module('estimationCalculator')
          .factory('changePlayerName', ChangePlayerName);

  ChangePlayerName.$inject = ['$ionicPopup', '$rootScope', '$q'];

  function ChangePlayerName($ionicPopup, $rootScope, $q)
  {
    return {
      changeName: changeName
    };

    function changeName(player)
    {
      var deferred = $q.defer();
      $rootScope.data = {playerName: player.name};
        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="data.playerName">',
          title: 'Enter Player Name',
          scope: $rootScope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e)
              {
                if (!$rootScope.data.playerName) {
                  e.preventDefault();
                } else {
                  return $rootScope.data;
                }
              }
            }
          ]
        });

        myPopup.then(function(res) {
          if(res){
            deferred.resolve(res);
          }
        });
        return deferred.promise;
    }
  }
})();
