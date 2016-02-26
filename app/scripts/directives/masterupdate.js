'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:masterUpdate
 * @description
 * # masterUpdate
 */
angular.module('re2App')
  .directive('masterUpdate', function ($rootScope) {
    return {
      restrict: 'A',
      transcend: true,
      scope : false,
      link: function postLink(scope, element/*, attrs*/) {
        $rootScope.$watch('masterSelect',function(newVal){
          //console.log('in masterUpdate root scope',newVal,$rootScope,element,attrs);
          element[0].checked=newVal;
        });

      }
    };
  });
