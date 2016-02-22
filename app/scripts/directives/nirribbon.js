'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:nirRibbon
 * @description
 * # nirRibbon
 */
angular.module('re2App')
  .directive('nirRibbon', function () {
    return {
      templateUrl: 'images/nirribbon.svg',
      restrict: 'E' /*,
      link: function postLink(scope, element) {
        //console.log('reached nir ribbon directive',scope,element);
      }*/
    };
  });
