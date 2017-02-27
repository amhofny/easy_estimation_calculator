(function() {
  'use strict';

    angular.module('estimationCalculator')
    .controller('MainController', MainController);

    MainController.$inject = ['$state', '$scope', '$localStorage'];

    function MainController($state, $scope, $localStorage)
    {
      var vm = this;
      $localStorage.$reset();
      $scope.$on('showBack', function(ev, val){
        vm.showBack = val;
      });
    }
})();
