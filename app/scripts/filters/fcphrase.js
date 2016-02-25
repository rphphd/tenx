'use strict';

/**
 * @ngdoc filter
 * @name re2App.filter:fcPhrase
 * @function
 * @description
 * # fcPhrase
 * Filter in the re2App.
 */
angular.module('re2App')
  .filter('fcPhrase', function () {
    return function (input) {
      return input === 'financed' ? 'with financing' : 'using cash' ;
    };
  });
