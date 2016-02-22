'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:MorepropertiesCtrl
 * @description
 * # MorepropertiesCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('MorepropertiesCtrl', function (_,$rootScope, $scope, investmentService,
      propertyService, riskGroupService) {

    propertyService.theInventory.then(function(results){

       var setProps = function () {
          if (results.length<=$scope.last+1) {
            $scope.properties = results.slice($scope.first);
          } else {
            $scope.properties = results.slice($scope.first,$scope.last+1);
          }
          $scope.hideLeft = $scope.first <= 0 ? true : false;
          $scope.hideRight = $scope.last >= (results.length-1) ? true : false;
          $scope.leftCursor =  $scope.hideLeft ? 'auto' : 'pointer';
          $scope.rightCursor =  $scope.hideRight ? 'auto' : 'pointer';
        };

      // initial conditions
      $scope.first = 0;
      $scope.last = Math.min(4,results.length-1);
      setProps();
      $scope.count = results.length;
      $scope.banners = getBanners(results);

      // arrow move functions after initial
      $scope.moveLeft = function() {
        if (!$scope.hideLeft) {
          $scope.hideLeft = true;
          $scope.first = Math.max(0, $scope.first-1);
          $scope.last --;
          setProps();
          console.log('moveLeft first last, hideleft hideright',$scope.first,$scope.last,$scope.hideLeft,$scope.hideRight);
        }
      };

      $scope.moveRight = function() {
        if (!$scope.hideRight) {
          $scope.hideRight = true;
          $scope.last = Math.min(results.length-1, $scope.last+1);
          $scope.first ++;
          setProps();
          console.log('moveRight first last, hideleft hideright',$scope.first,$scope.last,$scope.hideLeft,$scope.hideRight);
        }
      };

      $scope.addProperty = function(pid) {
        console.log('addProperty',pid,$scope);
        investmentService.addPropertyToRecommended(pid);
      };

    });

    var getBanners = function(props){
      var theBanners = [];
      _.forEach(props,function(p,i){
				theBanners.push(nirRibbonParams(p.nirclass,i+40));
			});
			return theBanners;
    };

    var nirRibbonParams = function (nirClass,stIndx) {
			var nirTitle = nirClass.substr(0,1).toUpperCase();
			if (nirTitle==='L') { nirTitle = 'LUXURY'; }
			var nirColor = riskGroupService.getNirColor(nirTitle).hex;
			return {
				'styleID' : stIndx,
				'ribbonColor' : '#' + nirColor,    'line1Color' : '#fff',
				'line1Font' : 'Proxima N W01 Smbd',  'line1FontSize' : '0px',
				'line1FontWeight' : '800',    'line23Color' : '#ffffff',
				'line23Font' : 'Proxima N W01 Smbd',  'line23FontSize' : '100px',
				'line23FontWeight' : '600',
				'line1' : '',
				'line2' : nirTitle.substr(0,3).toUpperCase(),
				'line3' : ''
			};
		};

});

