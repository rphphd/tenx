'use strict';

describe('Controller: WorkportfolioCtrl', function () {

  // load the controller's module
  beforeEach(module('re2App'));

  var WorkportfolioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkportfolioCtrl = $controller('WorkportfolioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

/*  it('should attach a list of awesomeThings to the scope', function () {
    expect(WorkportfolioCtrl.awesomeThings.length).toBe(3);
  }); */
});
