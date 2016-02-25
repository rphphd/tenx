'use strict';

/**
 * @ngdoc service
 * @name re2App.investment
 * @description
 * # investment
 * Service in the re2App.
 */
 angular.module('re2App')
 .service('investmentService', function(_,$rootScope,propertyService,
      localStorageService) {

  var investorSearchParameters = {
        riskTolerance        : 1,
				investmentAmount     : 25000,
				financing            : 'financed',
				investmentGoal       : 'appreciation'
	};

  var locations = ['Any HomeUnion Investment Properties'];
  var neighborhoods = [
    { name: 'Lux', selected: true },
    { name: 'A',   selected: true },
    { name: 'B',   selected: true },
    { name: 'C',   selected: true }
  ];
  var theProperties = null;
  var portfolio = (typeof portfolio === 'undefined' ) ? [] : portfolio;

  if (localStorageService.existsKey('investorSearchParameters')) {
    investorSearchParameters = localStorageService.getValue('investorSearchParameters');
  }

  if (localStorageService.existsKey('locations')) {
    locations = localStorageService.getValue('locations');
  }

  if (localStorageService.existsKey('neighborhoods')) {
    neighborhoods = localStorageService.getValue('neighborhoods');
  }

  $rootScope.haveRecommendations = propertyService.getProperties()
    .properties.then(function(result){
      theProperties = result;
      searchProperties();
      var recSet = _.filter(theProperties,{recommended: true});
      return recSet;
  });

  var searchProperties = function () {
    var fc = investorSearchParameters.financing;
    var ig = investorSearchParameters.investmentGoal;
    var qualProps = _.reject(theProperties, function(p){
      return typeof p[ig] === 'undefined';
    });
    //console.log('qual properties');
    qualProps = _.filter(qualProps,function(q){
      var res = false;
      var thisNh = q.nirclass.substr(0,1).toUpperCase();
      if (thisNh === 'L') {thisNh = 'Lux';}
      if ( _.find(neighborhoods,{name : thisNh}).selected) { res = true; }
      return res;
    });
    var totInv = 0;
    for (var i=0;i<qualProps.length;i++) {
      if (totInv+qualProps[i].minInvestment[fc] <
            investorSearchParameters.investmentAmount) {
          totInv+=qualProps[i].minInvestment[fc];
          qualProps[i].recommended = true;

      }
    }
    //console.log('qual properties',fc, ig, _.filter(qualProps,{recommended:true}));
  };

  this.searchInventory = function () {
    var fc = investorSearchParameters.financing;
    var results = propertyService.theInventory.then(function(props){
      var portfolioInvestment = 0;
      portfolioInvestment = _.reduce(portfolio, function(portfolioInvestment, p) {
        //console.log('p',p);
        return portfolioInvestment + p.minInvestment[fc];
      },portfolioInvestment);
      var remainingInvestment = investorSearchParameters.investmentAmount - portfolioInvestment;
      //console.log('searchInventory',portfolio,portfolioInvestment,remainingInvestment);
      var qualProps = _.filter(props,function(q){
        var res = false;
        var thisNh = q.nirclass.substr(0,1).toUpperCase();
        if (thisNh === 'L') {thisNh = 'Lux';}
        if ( _.find(neighborhoods,{name : thisNh}).selected) { res = true; }
        if (q.minInvestment[fc]>remainingInvestment) { res = false; }
        return res;
      });
      return qualProps;
    });

    //console.log('searchInventory',JSON.stringify(results));
    return results;
  };

	this.getInvPlan = function () {
		return investorSearchParameters.investmentGoal ;
	};

	this.setInvPlan = function (invPlan) {
		investorSearchParameters.investmentGoal=invPlan;
		localStorageService.setValue('investorSearchParameters',investorSearchParameters);
	};

	this.getFinancing = function () {
		return investorSearchParameters.financing ;
	};

	this.setFinancing = function (financing) {
		investorSearchParameters.financing=financing;
		localStorageService.setValue('investorSearchParameters',investorSearchParameters);
	};

	this.getInvParms = function () {
	  return investorSearchParameters;
	};

	this.setInvParms = function (parms) {
		investorSearchParameters=parms;
		localStorageService.setValue('investorSearchParameters',investorSearchParameters);
	};

	this.getLocations = function () {
	  return locations;
	};

	this.setLocations = function (locs) {
		locations=locs;
		localStorageService.setValue('locations',investorSearchParameters);
	};

	this.getNeighborhoods = function () {
	  return neighborhoods;
	};

	this.setNeighborhoods = function (nh) {
		neighborhoods=nh;
		localStorageService.setValue('neighborhoods',neighborhoods);
	};

	this.getPortfolio = function () {
	  return portfolio;
	};

	this.setPortfolio = function (pfolio) {
	  portfolio = pfolio;
	  $rootScope.portfolioChange = true;
	};

	this.addToPortfolio = function (property) {
	  portfolio.push(property);
	  $rootScope.portfolioChange = true;
	};

	this.deleteFromPortfolio = function (pid) {
	  portfolio = _.reject(portfolio, { pid : pid });
	  $rootScope.portfolioChange = true;
	};

	this.inPortfolio = function (pid) {
	  var res=false;
	  var propToFind = _.find(portfolio,function(prop){
	    return prop.pid === pid;
	  });
	  if (typeof  propToFind !== 'undefined') { res = true; }
	  return res;
	};

	this.orderBy = function (properties,field) {
    var fc = investorSearchParameters.financing;
	  var ordered = _.sortBy(properties, function(r) {
      switch (field) {
        case 'PRICE'             : return r.price;
        case 'INVESTMENT'        : return r.minInvestment[fc];
        case 'MARKET'            : return r.nirclass;
        case 'NEIGHBORHOOD'      : return r.nirclass;
        case 'APPRECIATION'      : return r.ApprReturn[fc];
        case 'CASH ON CASH'      : return r.cashOnCash;
        case 'YIELD'             : return '';
        case 'REALestimate\u2122': return r.REALestimate[fc];
        case 'TOTAL RETURN'      : return r.TotalReturn[fc];
      }
    });

    return ordered;
  };

  this.swapProperties = function (pid) {
    //console.log('swapProperties',pid,theProperties.length,theProperties);
    var oneToSwap = _.find(theProperties,{pid: pid});
    oneToSwap.rejected=true;
    oneToSwap.recommended=false;
    this.deleteFromPortfolio(pid);
    var remaining = _.filter(theProperties, function (r) {
      return !r.rejected && !r.recommended;
    });
    //console.log('swap properties',pid,remaining.length,remaining,theProperties.length,theProperties);
    var newOne = _.sample(remaining,1)[0].pid;
    console.log('newOne',newOne);
    _.find(theProperties,{pid : newOne}).recommended = true;
    var nextRecommendation = _.filter(theProperties, function (r) {
      return r.recommended;
    });
    return nextRecommendation;
  };

  this.deleteProperty = function (pid) {
    _.find(theProperties,{pid : pid}).recommended = false;
    this.deleteFromPortfolio(pid);
    var updatedRecommendation = _.filter(theProperties, function (r) {
      return r.recommended;
    });
    return updatedRecommendation;
  };

  this.addPropertyToRecommended = function(pid) {
    //console.log('addPropertyToRecommended pid',pid);
    propertyService.theInventory.then(function(results){
      //console.log('addPropertyToRecommended results',results.length,_.find(results,{pid : pid}));
      theProperties.push(
        propertyService.addNewProperty( _.find(results,{pid : pid}) )
      );
    });
    $rootScope.addedRecommendations = true;
  };

  this.getRecommendationUpdate = function () {
    //console.log('getRecommendationUpdate', theProperties.length, theProperties);
    var updatedRecommendation = _.filter(theProperties, function (r) {
      return r.recommended;
    });
    //console.log('updatedRecommendation',updatedRecommendation);
    return updatedRecommendation;
  };

  this.resetRecommendations = function () {
      console.log('resetRecommendations', theProperties.length, theProperties);
      this.clearRecommendations();
      searchProperties();
      var portfolioPids = _.pluck(portfolio,'pid');
      var newRecommendations = _.reject(
        _.filter(theProperties,{recommended:true}),
        function(p){ return portfolioPids.indexOf(p.pid)>=0; }
      );
      _.forEach(newRecommendations,function(r){
        _.find(theProperties,{pid: r.pid}).selected=true;
      });
      console.log('newRecommendations',newRecommendations);
      $rootScope.addedRecommendations = true;
      $rootScope.portfolioChange = true;
      $rootScope.invMixChg = true;
  };

  this.clearRecommendations = function () {
    _.forEach(theProperties,function(r){
        r.recommended = false;
    });
    $rootScope.recommendations = [];
  };

});
