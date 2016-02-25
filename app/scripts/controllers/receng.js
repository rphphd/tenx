'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:RecengCtrl
 * @description
 * # RecengCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('RecengCtrl', function (_,$rootScope, $scope, $document, $window, investmentService)
  {
    $rootScope.noNavBar = false;
    $scope.plan = investmentService.getInvPlan();
    $scope.sortField = 'Price';
    $scope.wpTop = {};
    $scope.sortDirection = 'fa fa-angle-up';
    $scope.fc = investmentService.getFinancing();
    $rootScope.reCurrentStep = 1;
    $scope.portfolioName = 'Working';
    $scope.showCheckBox = true;
    $scope.showPropListButtons = true;
    $scope.showWatchReplace = true;
    $rootScope.showPropsBadge = false;
    $scope.headerView = 'views/plheader.html';
    $scope.showHelp = true;

    console.log('RecengCtrl $scope', $scope.$id, $scope);

    $rootScope.addedRecommendations = false;

    var setAddRemoveButton = function (pid,ar,pm,func) {
      var theElement = document.getElementById('ar'+pid);
      if (theElement !== null ) {
        theElement.className = ar + ' button--xs button--blue-border';
        theElement.innerHTML = '<i class="fa fa-' + pm + '" ></i>&nbsp;' + func + ' Portfolio';
      }
    };

    var setRecommendations = function (recs) {
      $rootScope.recommendations = recs;
      $rootScope.numProps = recs.length;
    };

    $rootScope.haveRecommendations.then(function(results){
      var portPropsPids = _.pluck(investmentService.getPortfolio(),'pid');
      setRecommendations(investmentService.orderBy(results,'PRICE'));
      _.forEach($rootScope.recommendations, function(r) {
        if (portPropsPids.indexOf(r.pid)<0) {
          r.selected = true;
          setAddRemoveButton(r.pid,'pdAddToPortfolio','plus','Add to');
        } else {
          r.selected = false;
          setAddRemoveButton(r.pid,'pdRemoveFromPortfolio','minus','Remove from');
        }
      });
      $rootScope.invMixChg = true;
      console.log('in haveRecommendations, recommendatons',_.pluck($rootScope.recommendations,'pid').sort());
    });

    $scope.replaceProperty = function(pid) {
      console.log('replace property', pid);
      var currentPids = _.pluck($rootScope.recommendations,'pid');
      $rootScope.recommendations = investmentService.swapProperties(pid);
      var newPid = _.difference(_.pluck($rootScope.recommendations,'pid'),currentPids)[0];
      setAddRemoveButton(newPid,'pdAddToPortfolio','plus','Add to');
      console.log('replaceproperty: recommendatons',_.pluck($rootScope.recommendations,'pid').sort());
      $rootScope.invMixChg = true;
      $rootScope.portfolioChange = true;
      $rootScope.propertyListingChange = true;
    };

    $scope.deleteProperty = function(pid) {
      console.log('delete property', pid);
      $rootScope.recommendations = investmentService.deleteProperty(pid);
      $rootScope.numProps = $rootScope.recommendations.length;
      console.log('deleteproperty: recommendatons',_.pluck($rootScope.recommendations,'pid').sort());
      $rootScope.invMixChg = true;
    };

    $scope.addToRemoveFromPortfolio = function(pid) {
      var theElement = document.getElementById('ar'+pid);
      console.log('addToRemoveFromPortfolio',pid,theElement.className);
      if (theElement.className.indexOf('pdAddToPortfolio')>=0) {
        var theOneToAddOrRemove = _.find($rootScope.recommendations,{pid : pid});
        theOneToAddOrRemove.selected = false;
        investmentService.addToPortfolio(theOneToAddOrRemove);
        setAddRemoveButton(pid,'pdRemoveFromPortfolio','minus','Remove from');

      } else {
        investmentService.deleteFromPortfolio(pid);
        setAddRemoveButton(pid,'pdAddToPortfolio','plus','Add to');
      }
      $rootScope.portfolioChange = true;
    };

    $scope.addAllToPortfolio = function() {
      _.forEach($rootScope.recommendations,function(r){
        if (r.selected) {
          investmentService.addToPortfolio(r);
          r.selected = false;
          setAddRemoveButton(r.pid,'pdRemoveFromPortfolio','minus','Remove from');
        }
      });
    };

    $scope.changeSort = function (field) {
      $scope.sortField = field;
      $rootScope.recommendations = investmentService.orderBy($rootScope.recommendations,field);
      $scope.sortDirection = 'fa fa-angle-up';
    };

    $scope.changeDirection = function () {
      if ($scope.sortDirection.indexOf('up')>=0) {
        $scope.sortDirection = 'fa fa-angle-down';
      } else {
        $scope.sortDirection = 'fa fa-angle-up';
      }
      $rootScope.recommendations.reverse();
    };

    $scope.propSelected = function (pid) {
        var portPropsPids = _.pluck(investmentService.getPortfolio(),'pid');
        if (portPropsPids.indexOf(pid)>=0) {
          return 'background-color : rgb(242,242,242);';
        }
      return '';
    };

    $scope.checkedSelected = function (property) {
      console.log('checkedSelected',property);
      $rootScope.portfolioChange = true;
    };

    $rootScope.$watch('propertyListingChange', function(newValue,oldValue) {
      if (newValue && !oldValue) {
        $rootScope.propertyListingChange = false;
        var portPropsPids = _.pluck(investmentService.getPortfolio(),'pid');
        var recProps = investmentService.getRecommendationUpdate();
        //console.log('propertyListingChange',portPropsPids,recProps);
        _.forEach(recProps,function(rp){
          if (portPropsPids.indexOf(rp.pid)>=0) {
            setAddRemoveButton(rp.pid,'pdRemoveFromPortfolio','minus','Remove from');
          } else {
            setAddRemoveButton(rp.pid,'pdAddToPortfolio','plus','Add to');
          }
        });

      }
    });

    $rootScope.$watch('addedRecommendations',function(newValue,oldValue) {
      if (newValue && !oldValue) {
        console.log('addedRecommendations watch', newValue, oldValue);
        $rootScope.addedRecommendations = false;
        var currentPids = _.pluck($rootScope.recommendations,'pid');
        console.log('scope id is: ', $scope.$id,'currentPids',currentPids.sort());

        var newRecs = investmentService.getRecommendationUpdate();
        setRecommendations(investmentService.orderBy(newRecs,'PRICE'));

        var newPid = _.difference(_.pluck($rootScope.recommendations,'pid'),currentPids)[0];
        console.log('newPid',newPid,'new recommendations',$scope,_.pluck($rootScope.recommendations,'pid').sort());
        setAddRemoveButton(newPid,'pdAddToPortfolio','plus','Add to');
        $rootScope.recommendations[newPid].selected = true;
        $rootScope.invMixChg = true;
        $rootScope.portfolioChange = true;
        $rootScope.propertyListingChange = true;
      }
    });

  });
