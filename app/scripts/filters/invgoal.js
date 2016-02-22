'use strict';

/**
 * @ngdoc filter
 * @name re2App.filter:invGoal
 * @function
 * @description
 * # invGoal
 * Filter in the re2App.
 */
angular.module('re2App')
  .filter('invGoal', function () {
    return function (input) {
      var mapping = {
        'income'       : 'Income',
        'growth'       : 'Growth',
        'retirement'   : 'Retirement',
        'appreciation' : 'Growth',
        'yields'       : 'Income',
        'Working'      : 'Working'
      };
      return mapping[input];
    };
  });

