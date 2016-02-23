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
    investmentService.clearRecommendations();

    $scope.nSteps = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat mauris, faucibus quis pharetra sit amet, pretium ac libero.',
      'Integer vitae neque odio, a sollicitudin lorem. Aenean orci mauris, tristique luctus fermentum eu, feugiat vel massa.',
      'Donec consectetur pellentesque nisi sit amet elementum. Duis iaculis velit at eros dapibus vehicula. ',
      'Nullam elementum, felis vitae tempor ullamcorper, ipsum metus dapibus lorem, non molestie tellus libero et nisi. ',
      'Fusce ut nisl id risus facilisis euismod. Curabitur et elementum purus. Duis tincidunt fringilla eleifend.'
    ];

    var portfolio = investmentService.getPortfolio();
    console.log('portfolio',portfolio);

    $scope.recommendations = portfolio;
    console.log('in portfolio controller', $scope.recommendations);

    if (portfolio.length>0) { $scope.addViewButtonText = 'Confirm Portfolio'; }
    else { $scope.addViewButtonText = 'Create Portfolio'; }

    $rootScope.invMixChg = true;
    $scope.showHelp = true;

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
