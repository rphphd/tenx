'use strict';

describe('Controller: ModcriteriaCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var ModcriteriaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModcriteriaCtrl = $controller('ModcriteriaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModcriteriaCtrl.awesomeThings.length).toBe(3);
  });
});
