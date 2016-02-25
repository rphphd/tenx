'use strict';

describe('Filter: fcPhrase', function () {

  // load the filter's module
  beforeEach(module('re2App'));

  // initialize a new instance of the filter before each test
  var fcPhrase;
  beforeEach(inject(function ($filter) {
    fcPhrase = $filter('fcPhrase');
  }));

/*  it('should return the input prefixed with "fcPhrase filter:"', function () {
    var text = 'angularjs';
    expect(fcPhrase(text)).toBe('fcPhrase filter: ' + text);
  });*/

});
