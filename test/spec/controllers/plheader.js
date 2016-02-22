'use strict';

describe('Controller: PlheaderCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var PlheaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlheaderCtrl = $controller('PlheaderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlheaderCtrl.awesomeThings.length).toBe(3);
  });
  */
});
