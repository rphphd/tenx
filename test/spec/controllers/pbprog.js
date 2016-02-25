'use strict';

describe('Controller: PbprogCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var PbprogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PbprogCtrl = $controller('PbprogCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

/*  it('should attach a list of awesomeThings to the scope', function () {
    expect(PbprogCtrl.awesomeThings.length).toBe(3);
  });*/
});
