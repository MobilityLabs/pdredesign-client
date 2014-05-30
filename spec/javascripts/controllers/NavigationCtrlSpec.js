describe('Controller: NavigationCtrl', function() {
  var subject, scope, rootScope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $injector) {
    rootScope = $injector.get('$rootScope');
    scope     = rootScope.$new();
    subject   = $controller('NavigationCtrl', {
      $scope: scope,
    });

  }));

  it('update template when $emit session_updated', inject(
    function(SessionService) {
      spyOn(SessionService, 'setUserTemplate');

      rootScope.$emit('session_updated');

      expect(SessionService.setUserTemplate)
        .toHaveBeenCalled();
  }));

});
