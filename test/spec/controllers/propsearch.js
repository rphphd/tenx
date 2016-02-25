'use strict';

describe('Controller: PropsearchCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var PropsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropsearchCtrl = $controller('PropsearchCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    expect(PropsearchCtrl.awesomeThings.length).toBe(3);
  });
  */
});
