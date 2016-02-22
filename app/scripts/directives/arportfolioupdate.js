'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:arPortfolioUpdate
 * @description
 * # arPortfolioUpdate
 */
angular.module('re2App')
  .directive('arPortfolioUpdate', function () {
    return {
      //template: '<div></div>',
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
        attrs.class = 'pdAddToPortfolio btn button--xs button--blue-border';
        element[0].className = 'pdAddToPortfolio button--xs button--blue-border';
        element[0].innerHTML = '<i class="fa fa-plus" ></i> Add to Portfolio';
      }
    };
  });
