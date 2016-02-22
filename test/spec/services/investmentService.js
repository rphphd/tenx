'use strict';

describe('Service: investmentService', function () {

  // load the service's module
  beforeEach(module('re2App'));

  // instantiate service
  var investmentService;
  beforeEach(inject(function (_investmentService_) {
    investmentService = _investmentService_;
  }));

  it('should do something', function () {
    expect(!!investmentService).toBe(true);
  });

});
