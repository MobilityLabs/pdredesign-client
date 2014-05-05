describe('Controller: NavigationCtrl', function() {
  var subject, scope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $rootScope) {
    scope    = $rootScope.$new();
    subject  = $controller('NavigationCtrl', {
      $scope: scope,
    });

  }));

  xit('update template when $emit session_updated', inject(
    function($rootScope) {
      spyOn(scope, 'updateTemplate');

      $rootScope.$broadcast('session_updated');
      expect(scope.updateTemplate).toHaveBeenCalled();

  }));

});


