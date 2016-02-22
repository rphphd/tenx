'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:showNavBar
 * @description
 * # showNavBar
 */
angular.module('re2App')
  .directive('showNavBar', function ($compile) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          scope.$watch(attrs.ngHide, function() {
              console.log('showNavBar link watch',scope, attrs.ngHide, element, scope[attrs.ngHide] );
              $compile(element.contents())(scope);
          });
        }
    };
  });
