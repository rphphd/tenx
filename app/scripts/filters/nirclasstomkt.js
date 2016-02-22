'use strict';

/**
 * @ngdoc filter
 * @name re2App.filter:nirClassToMkt
 * @function
 * @description
 * # nirClassToMkt
 * Filter in the re2App.
 */
angular.module('re2App')
  .filter('nirClassToMkt', function () {
    return function (input) {
      var result = input.substr(0,1);
      if (result==='L') { result = 'LUX'; }
      return result;
    };
  });
