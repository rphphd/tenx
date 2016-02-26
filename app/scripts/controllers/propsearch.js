'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:PropsearchCtrl
 * @description
 * # PropsearchCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('PropsearchCtrl', function (_,$rootScope,$scope,investmentService) {

    $rootScope.noNavBar = false;
    $rootScope.showPropsBadge = false;
    $rootScope.reCurrentStep = 1;
    $scope.showHelp = true;
    $scope.headerView = 'views/psheader.html';
    $scope.fc = investmentService.getFinancing();
    $scope.sortField = 'PRICE';
    $scope.sortDirection = 'fa fa-angle-up';
    $scope.showCheckBox = true;
    $scope.showPropListButtons = true;
    $scope.showWatchReplace = false;
    $rootScope.masterSelect = false;

    $scope.numPerPage = 10;
    $scope.numPagesToShow = 7;
    $scope.firstItem = 0;
    $scope.totalItems = 0;
    $scope.lastItem = 0;
    $scope.recommendations = [];
    $scope.ctlName = 'propsearch';

    var theProps = [];
    investmentService.setPortfolio([]);

    var getTheProps = function (){
      investmentService.searchInventory().then(function(props){
        theProps = investmentService.orderBy(props,$scope.sortField);
        $scope.firstItem = 1;
        $scope.totalItems = theProps.length;
        $scope.lastItem = Math.min($scope.numPerPage, $scope.totalItems);
        $scope.recommendations = theProps.slice(0,$scope.numPerPage);
        $rootScope.recommendations = $scope.recommendations;
        //console.log('getTheProps',$scope.recommendations,_.pluck($scope.recommendations,'price'));
      });
    };

    var updatePortfolio = function () {
      $rootScope.recommendations = $scope.recommendations;
      $rootScope.numProps = $rootScope.recommendations.length;
      var theSelected = _.filter($scope.recommendations, { selected: true});
      $scope.numSelected = typeof theSelected === 'undefined' ? 0 : theSelected.length;
      console.log('updatePortfolio',$scope.recommendations,theSelected, $scope.numSelected);
    };

    getTheProps();

    $scope.$watch('firstItem',function(newVal){
      //var sortedProps = investmentService.orderBy(theProps,$scope.sortField);
      $scope.recommendations = theProps.slice(newVal,newVal+$scope.numPerPage);
      updatePortfolio();
      //console.log('first item',$scope.sortField,newVal,$scope.recommendations.length,_.pluck($scope.recommendations,'pid'),$scope.numPerPage,_.pluck($scope.recommendations,'price') );
    });

    $scope.$watch(investmentService.getNeighborhoods,function(/*newVal*/){
      //console.log('watch neighborhoods',JSON.stringify(newVal));
      getTheProps();
    },true);

    $scope.$watch(investmentService.getFinancing,function(newVal){
      //console.log('watch financing',newVal);
      $scope.fc = newVal;
      getTheProps();
    });

    $scope.$watch(investmentService.getInvParms,function(newVal){
      console.log('watch investment parameters',JSON.stringify(newVal));
      getTheProps();
    },true);

    $scope.$watch('portfolioChange',function(newVal){
      if (newVal) {
        $rootScope.masterSelect = false;
        $rootScope.portfolioChange = false;
        console.log('in propsearch portfolioChange watch',$scope);
      }
    });

    $scope.nSteps = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat mauris, faucibus quis pharetra sit amet, pretium ac libero.',
      'Integer vitae neque odio, a sollicitudin lorem. Aenean orci mauris, tristique luctus fermentum eu, feugiat vel massa.',
      'Donec consectetur pellentesque nisi sit amet elementum. Duis iaculis velit at eros dapibus vehicula. ',
      'Nullam elementum, felis vitae tempor ullamcorper, ipsum metus dapibus lorem, non molestie tellus libero et nisi. ',
      'Fusce ut nisl id risus facilisis euismod. Curabitur et elementum purus. Duis tincidunt fringilla eleifend.'
    ];

    $scope.changeSort = function (field) {
      $scope.sortField = field;
      theProps = investmentService.orderBy( theProps,field);
      $scope.recommendations = theProps.slice(
            $scope.firstItem,$scope.firstItem+$scope.numPerPage);
      updatePortfolio();
      $scope.sortDirection = 'fa fa-angle-up';
      console.log('changeSort',_.pluck($scope.recommendations,'pid'),_.pluck($scope.recommendations,'price'));
    };

    $scope.changeDirection = function () {
      if ($scope.sortDirection.indexOf('up')>=0) {
        $scope.sortDirection = 'fa fa-angle-down';
      } else {
        $scope.sortDirection = 'fa fa-angle-up';
      }
      theProps.reverse();
      $scope.recommendations = theProps.slice(
            $scope.firstItem,$scope.firstItem+$scope.numPerPage);
      updatePortfolio();
      console.log('changeDirection',$scope.recommendations,_.pluck($scope.recommendations,'price'));
    };

    $scope.checkedMaster = function() {
      $rootScope.masterSelect = !$rootScope.masterSelect;
      console.log('checkedMaster'/*,$rootScope.masterSelect*/);
      _.forEach($scope.recommendations, function(r){
         r.selected = $rootScope.masterSelect;
         r.recommended = true;
      },$scope);
      updatePortfolio();
    };

  });
