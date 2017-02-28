(function() {
  'use strict';

  angular.module('estimationCalculator')
          .factory('settingsService', SettingsService);

  SettingsService.$inject = ['$localStorage'];

  function SettingsService($localStorage)
  {
    var settings = {
      rounds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '13D']
    };
    loadSettings();

    return {
      settings: settings
    };

    function loadSettings()
    {
      if(!$localStorage.settings)
      {
        $localStorage.settings = settings;
      }
      else
        settings = $localStorage.settings;
    }

  }
})();
