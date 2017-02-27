(function() {
  'use strict';

    angular.module('estimationCalculator')
    .controller('HistoryController', HistoryController);

    HistoryController.$inject = ['$localStorage', '$scope'];

    function HistoryController($localStorage, $scope)
    {
      var vm = this;
      $scope.$emit('showBack',true);
      vm.bollas = $localStorage.bollas;
    }
})();
