'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:MarkdistCtrl
 * @description
 * # MarkdistCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('MarkdistCtrl', function ($rootScope,$scope,_,investmentService) {

    $scope.countLine = '';

    var getTheProperties = function () {
      var theProperties = investmentService.getPortfolio();
      if (typeof $rootScope.recommendations !== 'undefined' &&
          $rootScope.recommendations.length>0
      ) {
        theProperties = $rootScope.recommendations;
      }
      //console.log('getTheProperties',theProperties);
      return theProperties;
    };

    var updateMkts = function() {
        var recommendations = getTheProperties();
        var propCounts = recommendations.length;
        $scope.theMarkets = _.groupBy(recommendations,function(p){
          var theHIL = p.parameters.HIL.split(',');
          return theHIL[0].replace(/ /g,'');
        });
        $scope.theCities = _.keys($scope.theMarkets);
        var marketCount = $scope.theCities.length;
        $scope.countLine = propCounts > 0 ?
          propCounts + ' Properties in ' + marketCount + ' Markets' :
          'No properties selected';
        //console.log('mkt dist updateMkts',propCounts,marketCount,$scope.countLine);
    };

    updateMkts();

    $rootScope.$watch('mktDistChg',function(newValue,oldValue) {
      if (newValue && !oldValue) {
        //console.log('mktDistChg watch', newValue, oldValue);
        updateMkts();
        $rootScope.mktDistChg = false;
        $rootScope.growthDataChg = true;
      }
    });

  });
