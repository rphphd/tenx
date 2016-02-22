'use strict';

/**
 * @ngdoc function
 * @name re2App.controller:PbnavCtrl
 * @description
 * # PbnavCtrl
 * Controller of the re2App
 */
angular.module('re2App')
  .controller('PbnavCtrl', function (_,$scope,$location) {

    $scope.txt = 'This is the pbnav view.';

    $scope.menuItems = [
      {name : 'Portfolio', route : '/portfolio' },
      {name : 'Recommendation Engine', route : '/receng' },
      {name : 'Property Search', route : '/propsearch' },
      {name : 'Watchlist', route : '/watchlist' }
    ];

    $scope.selectedMenu = _.find($scope.menuItems, {route: $location.$$url});

    $scope.chgSelected = function(menu) {
      $scope.selectedMenu=menu;
    };

  });
