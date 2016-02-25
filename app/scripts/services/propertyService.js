'use strict';

/**
 * @ngdoc service
 * @name re2App.property
 * @description
 * # property
 * Service in the re2App.
 */
angular.module('re2App')
  .service('propertyService', function (_,$q,$http) {
    // AngularJS will instantiate a singleton by calling 'new' on this function

    var propertyProperties = [
			{
				streetAddress : '1234 Main Hammond Road',
				cityState : 'Columbus, OH',
				beds : 5,
				baths : 5,
				size : 2800,
				built : 1999,
				//price : 150000,
				HIL : 'Columbus, OH',
				thumbnailUrl : 'images/houses/home1.png'
			},
			{
				streetAddress : '77 Sunset Strip',
				cityState : 'San Antonio, TX',
				beds : 5,
				baths : 5,
				size : 2800,
				built : 1999,
				//price : 110000,
				HIL : 'San Antonio, TX',
				thumbnailUrl : 'images/houses/home2.png'
			},
			{
				streetAddress : '111 N. Maple Ave.',
				cityState : 'Birmingham, AL',
				beds : 5,
				baths : 5,
				size : 2800,
				built : 1999,
				//price : 85000,
				HIL : 'Birmingham, AL',
				thumbnailUrl : 'images/houses/home3.png'
			}
		];

		var loanRate = 0.05;
		var asstMgmtFee = 0.09;

    /*var growthData = [
      [ 0, 0,  0, 0, 0 ],
      [ 5, 75000, 3000, 1200, 3000 ],
      [10, 75100, 75000, 1500, 3000 ],
      [15, 75300, 75000, 1700, 3000 ],
      [20, 75700, 75000, 2400, 3000 ],
      [25, 75900, 75000, 3200, 3000 ],
      [30, 80000, 75000, 4000, 3000 ]
    ];*/

    var growthData = [
      [ 0, 0,  0, 0, 0 ],
      [ 5, 0,  0, 0, 0 ], [ 10, 0,  0, 0, 0 ],[ 15, 0,  0, 0, 0 ],
      [ 20, 0,  0, 0, 0 ],[ 25, 0,  0, 0, 0 ],[ 30, 0,  0, 0, 0 ]
    ];

    var appreciation = function (properties, financing, yrs) {
      var totalApprec = 0;
      _.forEach(properties,function(p){
        var newValue = p.price*(Math.pow((1+(p.ApprReturn[financing]/100)),yrs) - 1);
        //console.log('appreciation',yrs,p.price,p.ApprReturn[financing],newValue);
        totalApprec += newValue;
      });
      return Math.round(totalApprec);
    };

    var investment = function (properties, financing, yrs) {
      var totalInvestment = 0;
      _.forEach(properties,function(p){
        var asstMgmt = p.price*asstMgmtFee*yrs;
        var newValue = asstMgmt + p.minInvestment[financing];
        //console.log('investment',yrs,p.price,asstMgmt,newValue);
        totalInvestment += newValue;
      });
      return Math.round(totalInvestment);
    };

    var cashFlow = function (properties, financing, yrs) {
      var totalCash = 0;
      _.forEach(properties,function(p){
        var cashF = p.price*p.cashOnCash/100*yrs;
        //console.log('cashFlow',yrs,p.price,cashF);
        totalCash += cashF;
      });
      return Math.round(totalCash);
    };

    var loanPaydown = function (properties, financing, yrs) {
      var totalPaydown = 0;
      _.forEach(properties,function(p){
        var intst = loanRate/100/12;
        var payment = intst*p.price / (1 - Math.pow(1+intst,-360));
        var paydown = payment*yrs*12;
        //console.log('loanPaydown',yrs,p.price,payment,paydown);
        totalPaydown += paydown;
      });
      return Math.round(totalPaydown);
    };


/*
  Atlanta | Austin | Birmingham | Charlotte | Chattanooga | Chicago | Cincinnati |
  Cleveland | Columbia | Columbus | Dallas | Davenport | Greenville | Houston | Huntsville |
  Indianapolis | Jacksonville | Kansas City | Knoxville | Memphis | Milwaukee |
  Minneapolis | Nashville | Oklahoma City | Orlando | Pittsburgh | Raleigh-Durham |
  San Antonio | Southern California | Tampa
*/

    var getInventory = function () {
      var deferred = $q.defer();
      var inventory = [];
      //console.log('get inventory deferred, inventory',deferred,inventory);
      $http.get('scripts/services/inventory_trends.json')
      .success(function(data) {
        //console.log('http success data',data);
        inventory = _.remove(data,function(itm){
          return itm.nirclass !== 'D';
        });
        inventory = _.uniq(inventory,'pid');
        //console.log('inventory pulled from json', inventory);
        deferred.resolve(inventory);
      })
      .error(function(data, status){
        console.log('error in getting inventory', status);
        deferred.reject(inventory);
      });

      return deferred.promise;
    };

    this.theInventory = getInventory();

    this.getProperties = function() {
      var self=this;

      var getPropertiesFromInventory = function () {
        var properties = $q.defer();
        var inventory = self.theInventory;
        inventory.then(function(result) {
          console.log('inventory',result);
          _.forEach(result,function(r,i){
            result[i].parameters =
              propertyProperties[
                _.random(propertyProperties.length-1)
              ];
            result[i].cashOnCash = 5.83;
            result[i].recommended = false;
            result[i].rejected = false;
            result[i].price = result[i].minInvestment.cash;
          });
          var yields = _.sample (result,30);
          _.forEach(yields,function(y,i,l){ l[i].yields = i;});

          var apprec = _.sample (result,30);
          _.forEach(apprec,function(y,i,l){ l[i].appreciation = i;});

          var balanced = _.sample (result,30);
          _.forEach(balanced,function(y,i,l){ l[i].balanced = i;});

          console.log('yields',yields);
          properties.resolve( _.union(yields,apprec,balanced) );
          //console.log('properties',properties);

        }, function(result){ console.log('reject callback', result);});

        return properties.promise;
      };

      return {
          properties : getPropertiesFromInventory()
        };
    };

    this.addNewProperty = function(property) {
      var updatedProperty = property;
      updatedProperty.parameters =  propertyProperties[
          _.random(propertyProperties.length-1)
        ];
      updatedProperty.cashOnCash = 5.83;
      updatedProperty.recommended = true;
      updatedProperty.rejected = false;
      return updatedProperty;
    };

    this.get30yrGrowthData = function (properties, financing) {
      var data = {
          'cols': [
            { 'id': 'year', 'label': 'Year', 'type': 'string', 'p': {} },
            { 'id': 'proj-investment', 'label': 'Investment', 'type': 'number'  },
            { 'id': 'proj-loan', 'label': 'Loan Paydown', 'type': 'number', 'p': {} },
            { 'id': 'proj-apprec', 'label': 'Appreciation', 'type': 'number', 'p': {} },
            { 'id': 'proj-cashflow', 'label': 'Cash Flow', 'type': 'number', 'p': {} }
          ]
      };
      //console.log('get30yrGrowthData',properties, financing);
      for (var i=1;i<growthData.length;i++) {
          growthData[i][1] = investment(properties, financing, growthData[i][0]);
          growthData[i][2] = loanPaydown(properties, financing, growthData[i][0]);
          growthData[i][3] = appreciation(properties, financing, growthData[i][0]);
          growthData[i][4] = cashFlow(properties, financing, growthData[i][0]);

      }
      //console.log('growthData',JSON.stringify(growthData));

      data.rows = [];
      var newVals = [];
      _.forEach(growthData, function(rw){
        newVals = [];
        newVals.push( (rw[0]===0) ? { 'v': 'Today' } : { 'v': rw[0] + ' Years' } );
        var cumAmt=0;
        for (var i=1;i<rw.length;i++) {
          cumAmt+=rw[i];
          newVals.push( { 'v': cumAmt, 'f': ' $' + rw[i].toLocaleString('currency') } );
        }
        data.rows.push( { 'c' : newVals } );
      });

      //console.log('data', data);

      return data;
    };

});


