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
      templateUrl: 'images/rightarrow.svg',
      link: function postLink(scope, element) {
        console.log('reached right arrow directive',scope,element);
      }
    };
  });
