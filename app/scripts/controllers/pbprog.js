'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:PbprogCtrl
 * @description
 * # PbprogCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('PbprogCtrl', function ($rootScope, $scope, investmentService) {

    //$scope.plan = 'Growth';
    $scope.plan = investmentService.getInvPlan();

    $scope.steps = [
      'Create Plan: ' ,
      'Build Portfolio',
      'Start Bid Process'
    ];

    $scope.progressCheck = function (step) {
      var stepNo = $scope.steps.indexOf(step);
      if ($rootScope.reCurrentStep > stepNo) {
        return 'fa fa-check-circle'; }
      else { return 'fa fa-circle-o';}
    };

    $scope.progressStyle = function (step) {
      var stepNo = $scope.steps.indexOf(step);
      if ($rootScope.reCurrentStep >= stepNo) {
        return {}; }
      else { return {color: 'rgba(192,192,192,1)'};}
    };

  });
