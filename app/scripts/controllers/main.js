'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('MainCtrl', function (_,$rootScope,$scope,$location,investmentService) {
    var invParms = investmentService.getInvParms();
    $rootScope.noNavBar = true;
    $rootScope.retirementStatus = 'notRetired';
    $rootScope.investorAge = 40;
    var _investmentAmount = '$' + invParms.investmentAmount.toLocaleString('currency');
    $scope.inputError = false;
    $scope.errMsg = '';

    $scope.getStarted = function() {
      $location.path('/receng');
    };

    $scope.setRetirement = function (evt) {
      console.log('setRetirement',evt);
      evt.preventDefault();
      if (evt.target.innerHTML==='retired') { $rootScope.retirementStatus = 'retired'; }
      else { $rootScope.retirementStatus = 'notRetired'; }
    };

    $rootScope = _.extend($rootScope,{
      investmentAmount: function(amt) {
         if (typeof amt !== 'undefined') {
           _investmentAmount = amt;
           var newVal = parseInt(_investmentAmount.replace('$','').replace(',','').trim());
           console.log('change on inv amt',amt,_investmentAmount,newVal);
           if (newVal<25000) {
            $scope.inputError = true;
            $scope.errMsg = 'Investment amount must be at least $25,000';
           } else {
            $scope.inputError = false;
            $scope.errMsg = '';
            invParms = investmentService.getInvParms();
            invParms.investmentAmount = newVal;
            investmentService.setInvParms(invParms);
           }
         }
         return _investmentAmount;
      }
    });

  });
