'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:rightArrow
 * @description
 * # rightArrow
 */
angular.module('re2App')
  .directive('rightArrow', function () {
    return {
      restrict: 'E',
      templateUrl: 'images/rightarrow.svg'
    };
  });
