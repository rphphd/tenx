'use strict';

describe('Controller: MorepropertiesCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var MorepropertiesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MorepropertiesCtrl = $controller('MorepropertiesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

/*  it('should attach a list of awesomeThings to the scope', function () {
    expect(MorepropertiesCtrl.awesomeThings.length).toBe(3);
  });
*/
});
