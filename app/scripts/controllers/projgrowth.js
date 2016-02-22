'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:ProjgrowthCtrl
 * @description
 * # ProjgrowthCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('ProjgrowthCtrl', function ($rootScope, $scope, investmentService, propertyService) {

      $scope.cssStyle = { height : '300px', width : '383px' };
      $scope.chartObject = {
        'type': 'AreaChart',
        'displayed': true,
        'options': {
          'areaOpacity' : 0.8,
          'isStacked': true,
          'fill': 20,
          'legend': {'position': 'top', 'maxLines': 2, 'alignment' : 'center',
                      'textStyle' : {color: 'black',  fontSize: '10' }
                    },
          'displayExactValues': true,
          'chartArea' : { 'width' : '280' },
          'backgroundColor' : { 'fill' : 'rgb(216,216,216)' },
          'vAxis': {
            'gridlines'      : { count: 4, color : 'rgb(216,216,216)' },
            'format'         : 'short',
            'viewWindowMode' : 'maximized'
          },
          'hAxis': {
            'textStyle' : {color: 'black',  fontSize: '9' }
          },
          'series': { 0 : { lineWidth: '1' }, 1 : { lineWidth: '1' },
                      2 : { lineWidth: '1' }, 3 : { lineWidth: '1' } }
        }
      };

      $rootScope.haveRecommendations.then(function(recommendations){

          var projectedGrowthData = propertyService.get30yrGrowthData(
              recommendations, investmentService.getFinancing());

          $scope.chartObject.data = projectedGrowthData;

          console.log('started ProjgrowthCtrl',$rootScope,$scope);
      });

  });
