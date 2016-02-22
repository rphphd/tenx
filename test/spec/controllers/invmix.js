'use strict';

describe('Controller: InvmixCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var InvmixCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvmixCtrl = $controller('InvmixCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(InvmixCtrl.awesomeThings.length).toBe(3);
  });
  */
});
