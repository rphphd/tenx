'use strict';

/**
 * @ngdoc service
 * @name re2App.LocalStorage
 * @description
 * # LocalStorageService
 * Service in the re2App.
 */
angular.module('re2App')
  .service('localStorageService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var persistedData = {};

    var saveState = function () {
        localStorage.setItem('HUInvestmentData',angular.toJson(persistedData));
        console.log('ls HUInvestmentData',localStorage.getItem('HUInvestmentData'));
    };

    var restoreState = function () {
        if (typeof localStorage.HUInvestmentData!=='undefined') {
          persistedData = angular.fromJson(localStorage.getItem('HUInvestmentData'));
        }
    };

    restoreState();
    console.log('persisted data',persistedData);

    this.setValue = function (key, val) {
      persistedData[key] = val;
      console.log('set value', persistedData);
      saveState();
    };

    this.getValue = function (key) {
      var res = null;
      if (this.existsKey(key)) { res = persistedData[key]; }
      return res;
    };

    this.existsKey = function (key) {
      return persistedData.hasOwnProperty(key);
    };

  });
