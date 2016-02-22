'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:WorkportfolioCtrl
 * @description
 * # WorkportfolioCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('WorkportfolioCtrl', function (_,$rootScope,$scope,$location,investmentService) {

    console.log('WorkportfolioCtrl rootScope',$rootScope);

    var fc = investmentService.getFinancing();

    var setVariables = function (scope) {

      var portfolio = investmentService.getPortfolio();

      scope.totalReturn = 0;
      scope.appreciation = 0;
      scope.realEstimate = 0;
      scope.investment = 0;
      scope.portfolioValue = 0;
      scope.numberOfProperties = 0;
      scope.numberToAdd = 0;

      console.log('WorkportfolioCtrl portfolio',portfolio, scope);

      if (portfolio.length>0) {

        console.log('set variables', _.pluck(portfolio,'pid').sort() );

        scope.totalReturn = _.reduce(portfolio,function(s, r){
          return r.TotalReturn[fc]+s;
        },0) / portfolio.length;

        scope.appreciation = _.reduce(portfolio,function(s, r){
          return r.ApprReturn[fc]+s;
        },0) / portfolio.length;

        scope.realEstimate = _.reduce(portfolio,function(s, r){
          return r.REALestimate[fc]+s;
        },0) / portfolio.length;

        scope.investment = _.reduce(portfolio,function(s, r){
          return r.minInvestment[fc]+s;
        },0);

        scope.portfolioValue = _.reduce(portfolio,function(s, r){
          return r.price+s;
        },0);

        scope.numberOfProperties = portfolio.length;

      }

      if ($rootScope.numProps>0 && $location.path()=== '/receng' ) {
        var portfolioPids = _.pluck(portfolio,'pid');
        var selectedProps = _.reject(
          _.filter(investmentService.getRecommendationUpdate(),{selected : true}),
          function(p){ return portfolioPids.indexOf(p.pid)>=0; }
        );
        console.log('in workportfolio have recommedations, selectedProps:', selectedProps);

        if (selectedProps.length>0) {

          scope.totalReturn += _.reduce(selectedProps,function(s, r){
            return r.TotalReturn[fc]+s;
          },0) / selectedProps.length;

          scope.appreciation += _.reduce(selectedProps,function(s, r){
            return r.ApprReturn[fc]+s;
          },0) / selectedProps.length;

          scope.realEstimate += _.reduce(selectedProps,function(s, r){
            return r.REALestimate[fc]+s;
          },0) / selectedProps.length;

          scope.investment += _.reduce(selectedProps,function(s, r){
            return r.minInvestment[fc]+s;
          },0);

          scope.portfolioValue += _.reduce(selectedProps,function(s, r){
            return r.price+s;
          },0);

          scope.numberOfProperties += selectedProps.length;
          scope.numberToAdd = selectedProps.length;
          scope.hasPropertySelections = 'font-weight:900;';

        }

      }

      return scope;
    };

    var setUpButton = function () {
      switch ($location.path()) {
        case '/receng' :
          if ($scope.numberToAdd <= 0 && $scope.numberOfProperties > 0 ) {
            $scope.addViewButtonText = 'View Portfolio';
          } else if ($scope.numberToAdd > 0) {
            $scope.addViewButtonText = 'Add to my Portfolio (' + $scope.numberToAdd + ')';
          } else { $scope.addViewButtonText = 'No Properties to Add'; }
          break;
        case '/portfolio' :

          break;
      }
    };

    $scope = setVariables($scope);

    setUpButton();

    $scope.addToPortfolio = function () {
      console.log('in working portfolio reached add to portfolio',$scope.addViewButtonText.substr(0,4));
      switch ($scope.addViewButtonText.substr(0,4)) {
        case 'View':
          $location.path('/portfolio'); break;
        case 'Add ':
          $scope.hasPropertySelections = '';
          $rootScope.haveRecommendations.then(function(results){
            var selectedOnes = _.filter(results,{selected : true});
            _.forEach(selectedOnes,function(r){
              investmentService.addToPortfolio(r);
              r.selected = false;
            });
            $scope.numberToAdd = 0;
            $scope.hasPropertySelections = 'font-weight:normal;';
            $rootScope.portfolioChange = true;
            $rootScope.propertyListingChange = true;
          });
          break;
        case 'Conf': break;
        case 'Crea':
          $location.path('/receng'); break;
      }
    };

    $scope.showProperties = function () {
      return ($rootScope.numProps>0 && $scope.numberOfProperties>0) ? true : false;
    };

    $scope.$watch('numProps',function(newValue,oldValue){
      if (newValue!==oldValue) {
        console.log('workportfolio portfolio numProps watch called',newValue,oldValue);
        $scope = setVariables($scope);
        setUpButton();
        console.log('end of numProps watch',$scope, $scope.$id,$rootScope);
        $rootScope.propertyListingChange = true;
        setUpButton();
      }
    });

    $scope.$watch(function() { return $rootScope.portfolioChange; },
              function(newValue,oldValue){
      if (newValue && !oldValue) {
        $rootScope.portfolioChange=false;
        console.log('workportfolio portfolioChange watch called',newValue,oldValue);
        $scope = setVariables($scope);
        setUpButton();
        console.log('end of portfolioChange watch',$scope, $scope.$id,$rootScope);
        $rootScope.propertyListingChange = true;
      }
    });

});
