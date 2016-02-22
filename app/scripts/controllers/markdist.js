'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:MarkdistCtrl
 * @description
 * # MarkdistCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('MarkdistCtrl', function ($rootScope,$scope,_) {

     var updateMkts = function(recommendations) {

        $scope.propCounts = recommendations.length;
        $scope.theMarkets = _.groupBy(recommendations,function(p){
          var theHIL = p.parameters.HIL.split(',');
          return theHIL[0].replace(/ /g,'');
        });
        $scope.theCities = _.keys($scope.theMarkets);
        $scope.marketCount = $scope.theCities.length;

     };


     $rootScope.haveRecommendations.then(function(results){
      var recProps = results;
      updateMkts(recProps);
    });

    $rootScope.$watch('mktDistChg',function(newValue,oldValue) {
      if (newValue && !oldValue) {
        console.log('mktDistChg watch', newValue, oldValue);
        $rootScope.mktDistChg = false;
        updateMkts($rootScope.recommendations);
      }
    });

  });
