'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:mktDistMap
 * @description
 * # mktDistMap
 */
angular.module('re2App')
  .directive('mktDistMap', function () {
    return {
      templateUrl: 'images/Blank_US_Map.svg',
      restrict: 'E',
      link: function postLink(scope, elem) {

       scope.$watch('theCities', function() {
          if (typeof scope.theCities !== 'undefined') {
            var cityDots = elem[0].getElementsByClassName('circle');
            var selectedMkts = scope.theCities;
            for (var i=0;i<selectedMkts.length;i++) { selectedMkts[i] = selectedMkts[i].toLowerCase(); }
            for (i=0;i<cityDots.length;i++) {
              if (selectedMkts.indexOf(cityDots[i].id)<0) {
                cityDots[i].style.setProperty('display','none');
              } else {cityDots[i].style.setProperty('display','block');}
            }
          }
        });

      }
    };
  });

