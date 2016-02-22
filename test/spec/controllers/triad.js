'use strict';

describe('Controller: TriadCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var TriadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TriadCtrl = $controller('TriadCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TriadCtrl.awesomeThings.length).toBe(3);
  });
});
