'use strict';

/**
 * @ngdoc filter
 * @name re2App.filter:fcDisplay
 * @function
 * @description
 * # fcDisplay
 * Filter in the re2App.
 */
angular.module('re2App')
  .filter('fcDisplay', function () {
    return function (input) {
      return input === 'financed' ? 'Financed' : 'Cash' ;
    };
  });
