'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:PortfolioCtrl
 * @description
 * # PortfolioCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('PortfolioCtrl', function (
        $rootScope,$scope,investmentService
  ) {

    $scope.plan = investmentService.getInvPlan();
    $scope.fc = investmentService.getFinancing();
    $scope.portfolioName = $scope.plan;
    $scope.sortField = 'Price';
    $scope.sortDirection = 'fa fa-angle-up';
    $rootScope.reCurrentStep = 2;
    $scope.showCheckBox = false;
    $scope.addViewButtonText = '';
    $scope.showPropListButtons = false;
    $rootScope.showPropsBadge = true;

    var portfolio = investmentService.getPortfolio();
    console.log('portfolio',portfolio);

    $scope.recommendations = portfolio;
    console.log('in portfolio controller', $scope.recommendations);

    if (portfolio.length>0) { $scope.addViewButtonText = 'Confirm Portfolio'; }
    else { $scope.addViewButtonText = 'Create Portfolio'; }

    $scope.tab = 1;

    $scope.selectTab = function (setTab){
    	$scope.tab = setTab;
    };

    $scope.isSelected = function(checkTab) {
    	return $scope.tab === checkTab;
    };

    $scope.changeSort = function (field) {
      $scope.sortField = field;
      portfolio = investmentService.orderBy(portfolio,field);
      $rootScope.recommendations = portfolio;
      $scope.sortDirection = 'fa fa-angle-up';
    };

    $scope.changeDirection = function () {
      if ($scope.sortDirection.indexOf('up')>=0) {
        $scope.sortDirection = 'fa fa-angle-down';
      } else {
        $scope.sortDirection = 'fa fa-angle-up';
      }
      portfolio.reverse();
      $scope.recommendations = portfolio;
    };



  });
