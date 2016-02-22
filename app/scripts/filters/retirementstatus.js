'use strict';

/**
 * @ngdoc filter
 * @name re2App.filter:retirementStatus
 * @function
 * @description
 * # retirementStatus
 * Filter in the re2App.
 */
angular.module('re2App')
  .filter('retirementStatus', function () {
    return function (input) {
      var res = 'not retired';
      if (input==='retired') { res = 'retired'; }
      console.log('retirementStatus filter',input,res);
      return res;
    };
  });
