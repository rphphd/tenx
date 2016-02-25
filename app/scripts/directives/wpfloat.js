'use strict';

/**
 * @ngdoc directive
 * @name re2App.directive:wpfloat
 * @description
 * # wpfloat
 */
angular.module('re2App')
  .directive('wpFloat', function ($window) {

    var moveIt = function(scope){
      //console.log('in wpFloat, scope:',scope,$location.path(),$window.scrollY);
      var topBoundary, navTopBoundary, botElement, wpPaneH;
      //var floatLocations = ['/receng'];

      angular.element($window).bind('scroll', function() {
        var topElement = $window.document.getElementById('topForWorkingPortfolio');
        topBoundary = topElement.getBoundingClientRect().bottom;
        topBoundary += topElement.style.marginBottom === '' ? 0 : parseInt(topElement.style.marginBottom);
        var navElement = $window.document.getElementById('portBuilderNavBar');
        navTopBoundary = navElement.getBoundingClientRect().bottom;
        navTopBoundary += navElement.style.marginBottom === '' ? 0 : parseInt(navElement.style.marginBottom);

        var scrDiff = Math.max(topBoundary,navTopBoundary);

        var wpPane = $window.document.getElementById('workPortfolioPane');
        var wpPaneR = wpPane.getBoundingClientRect();
        wpPaneH = wpPaneR.bottom - wpPaneR.top;

        botElement = $window.document.getElementById('bottomForWorkingPortfolio');

        if (botElement!==null) {
          var botBoundary = botElement.getBoundingClientRect().top;
          scrDiff = Math.min(scrDiff, botBoundary-wpPaneH-30);
        }

        //if (floatLocations.indexOf($location.path())<0) { scrDiff = topBoundary; }

        scope.$parent.wpTop = {'top':scrDiff};
        scope.$apply();
      });
    };

    return moveIt;

  });
