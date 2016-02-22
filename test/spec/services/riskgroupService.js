'use strict';

describe('Service: riskGroupService', function () {

  // load the service's module
  beforeEach(module('re2App'));

  // instantiate service
  var riskGroupService;
  beforeEach(inject(function (_riskGroupService_) {
    riskGroupService = _riskGroupService_;
  }));

  it('should do something', function () {
    expect(!!riskGroupService).toBe(true);
  });

});
