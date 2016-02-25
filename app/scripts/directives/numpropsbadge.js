'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:numPropsBadge
 * @description
 * # numPropsBadge
 */
angular.module('re2App')
  .directive('numPropsBadge', function ($compile) {
    return {
      template: '<span class="badge" ng-show="showPropsBadge">{{numProps}}</span>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          //console.log('numPropsBadge',scope,element,attrs);
          scope.$watch(attrs.inRe, function() {
              //console.log('showNavBar link watch',scope, attrs.ngHide, element, scope[attrs.ngHide] );
              $compile(element.contents())(scope);
          });
      }
    };
  });
