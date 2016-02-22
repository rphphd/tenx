'use strict';

/**
 * @ngdoc overview
 * @name re2App
 * @description
 * # re2App
 *
 * Main module of the application.
 */
var re2App = angular
  .module('re2App', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'googlechart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/receng', {
        templateUrl: 'views/receng.html',
        controller: 'RecengCtrl',
        controllerAs: 'receng'
      })
      .when('/pb', {
        redirectTo: '/receng'
      })
      .when('/propsearch', {
        templateUrl: 'views/propsearch.html',
        controller: 'PropsearchCtrl',
        controllerAs: 'propsearch'
      })
      .when('/watchlist', {
        templateUrl: 'views/watchlist.html',
        controller: 'WatchlistCtrl',
        controllerAs: 'watchlist'
      })
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'portfolio'
      })
      .otherwise({
        redirectTo: function(currParms, curLocation, pathParms) {
          console.log('otherwise', currParms, curLocation, pathParms);
          return '/';
        }
      });
  })
  .constant('_', window._)
  .constant('tinycolor', window.tinycolor);

console.log('re2App', re2App,'googlechart');

re2App.run(['$document', '$rootScope', function ($document, $rootScope) {

    var ubiOn =  false;

    $rootScope.sortFields = ['PRICE','INVESTMENT','MARKET','NEIGHBORHOOD',
          'APPRECIATION','CASH ON CASH','YIELD','REALestimate\u2122',
          'TOTAL RETURN'];

    var getClosestID = function (target) {
      var maxDepth = 10;
      var curElement = target;
      while (curElement.id==='' && maxDepth>0) {
        curElement = curElement.parentElement;
        maxDepth--;
      }
      return curElement.id;
    };

    var ubiHandler = function(evt) {
      var tgt = evt.target;
      if (tgt.localName!=='body') {
        var closestId = getClosestID(tgt);
        var logEntry = {
            type        : evt.type,                   timeStamp    : (new Date()).getTime(),
            windowHref  : window.location.href,       targetDOMtag : tgt.localName,
            windowHost  : window.location.hostname,   targetValue  : tgt.value,
            windowHash  : window.location.hash,       targetName   : tgt.name,
            windowPort  : window.location.port,       targetText   : tgt.textContent.trim(),
            closestId   : closestId
        };
        //logEntry = logEntry.concat(getSessionInfo());
        console.log('ubiHandler', evt,logEntry);
        // AJAX PUT goes here...
      }
    };

    if (ubiOn) {
      var ubiEvents = [
        'click','keydown','focus','blur','mouseenter',
        'mouseleave','submit','change','select'
      ];
      var bodyNode = $document.find('body')[0];
      console.log('body node',bodyNode);
      for (var i=0;i<ubiEvents.length;i++) {
        bodyNode.addEventListener(ubiEvents[i], ubiHandler);
      }
    }
}]);


