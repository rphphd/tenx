'use strict';

describe('Filter: cityStateToMarket', function () {

  // load the filter's module
  beforeEach(module('re2App'));

  // initialize a new instance of the filter before each test
  var cityStateToMarket;
  beforeEach(inject(function ($filter) {
    cityStateToMarket = $filter('cityStateToMarket');
  }));

  /*it('should return the input prefixed with "cityStateToMarket filter:"', function () {
    var text = 'angularjs';
    expect(cityStateToMarket(text)).toBe('cityStateToMarket filter: ' + text);
  });
  */

});
