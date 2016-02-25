'use strict';

describe('Controller: RecengCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var RecengCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecengCtrl = $controller('RecengCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

/*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecengCtrl.awesomeThings.length).toBe(3);
  });
*/
});
