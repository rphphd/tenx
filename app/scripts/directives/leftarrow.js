'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:leftArrow
 * @description
 * # leftArrow
 */
angular.module('re2App')
  .directive('leftArrow', function () {

    return {
      restrict: 'E',
      templateUrl: 'images/leftarrow.svg'
    };

  });

