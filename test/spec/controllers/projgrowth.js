'use strict';

describe('Controller: ProjgrowthCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var ProjgrowthCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjgrowthCtrl = $controller('ProjgrowthCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProjgrowthCtrl.awesomeThings.length).toBe(3);
  });
  */
});
