'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:InvmixCtrl
 * @description
 * # InvmixCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('InvmixCtrl', function (
                  $rootScope, $scope, _, riskGroupService, investmentService) {

    var nhCounts;
    var nhClasses = ['LUXURY','A','B','C'];
    $scope.nhColors= [];

    _.forEach(nhClasses,function(nhc){
      $scope.nhColors[nhc] = riskGroupService.getNirColor(nhc);
    });

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

    var updateMix = function () {
      var recommendations = getTheProperties();
      nhCounts = { 'LUXURY' : 0, 'A' : 0, 'B' : 0, 'C' : 0 };
      _.forEach(recommendations,function(p){
        var nh = p.nirclass.substr(0,1).toUpperCase().replace('L','Luxury');
        if (nhCounts.hasOwnProperty(nh)) {
          nhCounts[nh]++;
        } else {
          nhCounts[nh] = 1;
        }
      });
      //console.log('nhCounts',nhCounts, 'recommendations', recommendations);
      $scope.nhClasses = nhClasses;
      $scope.nhCounts = nhCounts;
    };

    updateMix();

    $rootScope.$watch('invMixChg',function(newValue) {
      if (newValue) {
        //console.log('invMixChg watch', newValue, oldValue);
        updateMix();
        $rootScope.invMixChg = false;
        $rootScope.mktDistChg = true;
      }
    });

  });
