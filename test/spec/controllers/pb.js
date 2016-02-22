'use strict';

describe('Controller: PbCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var PbCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PbCtrl = $controller('PbCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(PbCtrl.awesomeThings.length).toBe(3);
  });
  */
});
