'use strict';

describe('Controller: PbnavCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var PbnavCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PbnavCtrl = $controller('PbnavCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

/*  it('should attach a list of awesomeThings to the scope', function () {
    expect(PbnavCtrl.awesomeThings.length).toBe(3);
  });*/
});
