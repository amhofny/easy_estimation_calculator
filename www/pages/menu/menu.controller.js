(function() {
  'use strict';

    angular.module('estimationCalculator')
    .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope'];

    function MenuController($scope)
    {
      var vm = this;
      $scope.$emit('showBack',false);
    }
})();
