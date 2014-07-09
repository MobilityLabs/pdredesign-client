describe('Controller: ResetPasswordCtrl', function() {
  var subject,
      scopeget,
      httpBackend

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller) {
      q                  = $injector.get('$q');
      scope              = $injector.get('$rootScope').$new();
      httpBackend        = $injector.get('$httpBackend');

      subject  = $controller('ResetPasswordCtrl', {
        $scope: scope,
      });
      scope.assessmentId = 1;

  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#requestPassword', function(){

    it('sends the reset request', function() {
      httpBackend.expectPOST('/v1/user/request_reset').respond({});
      scope.requestReset('someUser@email.com');
      httpBackend.flush();
    });

  });

  describe('#resetPassword', function(){

    it('sends the reset request', function() {
      httpBackend.expectPOST('/v1/user/reset').respond({});
      scope.resetPassword('test', 'test');
      httpBackend.flush();
    });

    it('does not send when password dont match', function(){
      spyOn(scope, 'success');
      scope.resetPassword('ztest', 'test');

      expect(scope.success).not.toHaveBeenCalled();
    });

  });
});

