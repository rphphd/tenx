'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:ModcriteriaCtrl
 * @description
 * # ModcriteriaCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('ModcriteriaCtrl', function ($scope,_,$sce,investmentService) {

    var openClosePanel = false;
    $scope.invAmt = '$' +  investmentService.getInvParms()
        .investmentAmount.toLocaleString('currency');
    //console.log('invAmt',$scope.invAmt);
    $scope.locations = investmentService.getLocations().join(', ');
    $scope.neighborhoods = investmentService.getNeighborhoods();
    //console.log('neighborhoods',$scope.neighborhoods);
    $scope.financing = investmentService.getFinancing();
    $scope.fc = [ {name: 'financed', selected: false} , {name: 'cash', selected: false} ];
    //console.log('financing',$scope.financing);
    $scope.goals = [ {name: 'yields', selected: false },
          {name: 'appreciation', selected: false }, {name: 'balanced', selected: false } ];
    $scope.invPlan = investmentService.getInvPlan();

    var filters = [
      { name : 'Locations', icon : '',
        state: 'display', width: '40', code :
        $sce.trustAsHtml('<input type="text" ' +
          'ng-model="locations" style="font-size:12px;width:95%"/>') },
      { name : 'Investment Amount', icon : '',
        state: 'display', width: '20', code :
        $sce.trustAsHtml('<input type="text"  ' +
          'ng-model="invAmt"  ng-change="invAmtChg(invAmt)"/>') },
      { name : 'Neighborhoods', icon : 'fa-question-circle',
        state: 'display', width: '30', code :
        $sce.trustAsHtml('<button class="btn btn-default" ng-style="getNHStyle(nh)" ' +
          'ng-repeat="nh in neighborhoods" ng-click="selectNH( nh )">' +
          '{{ nh.name | uppercase }}</button>') },
      { name : 'Finance', icon : '',
        state: 'collapsed', width: '30', code :
        $sce.trustAsHtml('<label class="radio-inline" ng-repeat="fcoption in fc">' +
          '<input type="radio" name="financing" ng-model="financing" value="{{fcoption.name}}" ' +
          '  ng-Click="changeFinancing(fcoption)" >' +
          '{{ fcoption.name | fcDisplay }}</label>') },
      { name : 'Investment Goal', icon : '',
        state: 'collapsed', width: '50', code :
        $sce.trustAsHtml('<label class="radio-inline" ng-repeat="goaloption in goals">' +
          '<input type="radio" name="invPlan" ng-model="invPlan" value="{{goaloption.name}}" ' +
          '  ng-Click="changeGoal(goaloption)" >' +
          '{{ goaloption.name }}</label>') },
    ];

    $scope.showCriteria = false;
    $scope.openClose = 'fa fa-chevron-down';
    $scope.filters = filters;
    $scope.theRowRange = _.range(Math.ceil(filters.length/3));
    //console.log($scope.filters,$scope.theRowRange);

    $scope.openClosePanel = function() {
      if (openClosePanel) {
        openClosePanel=false;
        $scope.openClose = 'fa fa-chevron-down';
        $scope.showCriteria = false;
      } else {
        openClosePanel=true;
        $scope.openClose = 'fa fa-chevron-up';
        $scope.showCriteria = true;
      }
    };

    $scope.invAmtChg = function(newValue) {
      var invPlan = investmentService.getInvParms();
      invPlan.investmentAmount = parseInt(newValue.replace('$','').replace(',',''));
      investmentService.setInvParms(invPlan);
      //console.log('watch', newValue,investmentService.getInvParms());
      investmentService.resetRecommendations();
    };

    $scope.selectNH = function (nh) {
      //console.log('selectNH',nh);
      if (nh.selected) { nh.selected = false; }
      else { nh.selected = true; }
      //console.log('neighborhoods updated',$scope.neighborhoods);
      investmentService.setNeighborhoods($scope.neighborhoods);
      investmentService.resetRecommendations();
    };

    $scope.getNHStyle = function (nh) {
      if (nh.selected) {
        return {'background-color' : '#000', color : '#fff',
          'margin-right' : '5px' };
      } else {
        return {'background-color' : 'rgba(216,216,216,1)', color : '#000',
          'margin-right' : '5px' };
      }
    };

    $scope.changeFinancing = function(fn) {
      console.log('changeFinancing',fn);
      $scope.financing=fn.name;
      investmentService.setFinancing(fn.name);
      _.forEach($scope.fc,function(itm){ itm.selected = false; });
      fn.selected = true;
      investmentService.resetRecommendations();
    };

    $scope.changeGoal = function(goal) {
      console.log('changeGoal',goal);
      $scope.invPlan=goal.name;
      investmentService.setInvPlan(goal.name);
      _.forEach($scope.goals,function(itm){ itm.selected = false; });
      goal.selected = true;
      investmentService.resetRecommendations();
    };

    $scope.expandFilter = function (fltrNm) {
      console.log('expandFilter',fltrNm);
      var expFilter = _.find($scope.filters,{name : fltrNm});
      //console.log('expfilter',expFilter);
      if (typeof expFilter !== 'undefined') {
        expFilter.state = 'display';
        //console.log('chg state', expFilter, $scope.fc, $scope );
      }
    };

    $scope.collapseFilter = function (fltrNm) {
      //console.log('collapseFilter',fltrNm);
      var colFilter = _.find($scope.filters,{name : fltrNm});
      console.log('colfilter',colFilter);
      if (typeof colFilter !== 'undefined') {
        colFilter.state = 'collapsed';
        //console.log('chg state', colFilter, $scope.fc, $scope );
      }
    };

    $scope.portfolioReset = function (evt) {
      evt.preventDefault();
      investmentService.setPortfolio([]);
      console.log('portfolioReset',investmentService.getPortfolio());
    };

  });
