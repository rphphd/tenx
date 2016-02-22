'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:ngHtmlCompile
 * @description
 * # ngHtmlCompile
 */
angular.module('re2App')
  .directive('ngHtmlCompile', function($compile) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          scope.$watch(attrs.ngHtmlCompile, function(newValue) {
              element.html(newValue);
              $compile(element.contents())(scope);
          });
        }
    };
  });
