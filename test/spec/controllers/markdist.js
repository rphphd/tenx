'use strict';

describe('Controller: MarkdistCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var MarkdistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarkdistCtrl = $controller('MarkdistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(MarkdistCtrl.awesomeThings.length).toBe(3);
  });
  */
});
