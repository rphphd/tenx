'use strict';

/**
 * @ngdoc filter
 * @name re2App.filter:cityStateToMarket
 * @function
 * @description
 * # cityStateToMarket
 * Filter in the re2App.
 */
angular.module('re2App')
  .filter('cityStateToMarket', function () {
    return function (input) {
      var locArr = input.split(',');
      return locArr[0];
    };
  });
