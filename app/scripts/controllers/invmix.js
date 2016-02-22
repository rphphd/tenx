'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:InvmixCtrl
 * @description
 * # InvmixCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('InvmixCtrl', function ($rootScope, $scope, _, riskGroupService) {

    var recProps = [];
    var nhCounts;
    var nhClasses = ['LUXURY','A','B','C'];
    $scope.nhColors= [];

    _.forEach(nhClasses,function(nhc){
      $scope.nhColors[nhc] = riskGroupService.getNirColor(nhc);
    });

    var updateMix = function (recommendations) {
      nhCounts = { 'LUXURY' : 0, 'A' : 0, 'B' : 0, 'C' : 0 };
      _.forEach(recommendations,function(p){
        var nh = p.nirclass.substr(0,1).toUpperCase().replace('L','Luxury');
        if (nhCounts.hasOwnProperty(nh)) {
          nhCounts[nh]++;
        } else {
          nhCounts[nh] = 1;
        }
      });
      console.log('nhCounts',nhCounts);
      $scope.nhClasses = nhClasses;
      $scope.nhCounts = nhCounts;
    };

    console.log('$scope.nhColors',$scope.nhColors);
    $rootScope.haveRecommendations.then(function(results){
      recProps = results;
      console.log('inv mix rec Props',recProps);
      updateMix(results);
    });

    $rootScope.$watch('invMixChg',function(newValue,oldValue) {
      if (newValue !== oldValue) {
        console.log('invMixChg watch', newValue, oldValue);
        $rootScope.invMixChg = false;
        updateMix($rootScope.recommendations);
        $rootScope.mktDistChg = true;
      }
    });

  });
