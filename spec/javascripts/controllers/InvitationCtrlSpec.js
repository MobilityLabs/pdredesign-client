describe('Controller: InvitationCtrl', function() {
  var subject,
      httpBackend,
      Invitation,
      SessionService,
      q,
      location,
      timeout;

  var mockInvitedUser = {first_name: 'Mike',
                         last_name: 'Davis',
                         password: 'testtest',
                         email: 'user@test.com',
                        };

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller) {
      q  = $injector.get('$q');
      scope              = $injector.get('$rootScope').$new();
      httpBackend        = $injector.get('$httpBackend');
      Invitation         = $injector.get('Invitation');
      SessionService     = $injector.get('SessionService');
      timeout            = $injector.get('$timeout');
      location           = $injector.get('$location');

      subject  = $controller('InvitationCtrl', {
        $scope: scope
      });
      scope.token = 1

  }));

  it('retrieves the invitedUser', function() {
      httpBackend.expectGET('/v1/invitations').respond({});
        httpBackend.flush();
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
  });

  it('redeemInvite calls Invitation.save resource', function() {
     spyOn(Invitation, 'save')
          .and.callFake(function() {
            var deferred = q.defer();
            deferred.resolve({});
            return {$promise: deferred.promise};
        });
        expect(Invitation.save).not.toHaveBeenCalled();
        scope.redeemInvite();
        expect(Invitation.save).toHaveBeenCalled();
  });

  it('redeemInvite passes invitedUser information to the inviteObject', function() {
     scope.invitedUser = mockInvitedUser
     spyOn(Invitation, 'save')
          .and.callFake(function() {
            var deferred = q.defer();
            deferred.resolve();
            return {$promise: deferred.promise};
        });
        expect(scope.inviteObject).toEqual({})
        expect(scope.inviteObject.first_name).not.toEqual('Mike')
        scope.redeemInvite();
        expect(scope.inviteObject.first_name).toEqual('Mike')
  });

  it('Invitation save success callback should set url to /login', function() {
     httpBackend.expectGET('/v1/invitations').respond({});
     spyOn(Invitation, 'save')
          .and.callFake(function() {
            var deferred = q.defer();
            deferred.resolve({});
            return {$promise: deferred.promise};
        });
        scope.redeemInvite();
        httpBackend.flush();
        expect(location.url()).toEqual('/login')
  });

  it('Invitation save failure callback should set up modal', function() {
     httpBackend.expectGET('/v1/invitations').respond({});
     spyOn(Invitation, 'save')
          .and.callFake(function() {
            var deferred = q.defer();
            deferred.reject({data: {errors: ['password' : 'Invalid email or password!']}});
            return {$promise: deferred.promise};
        });
        expect(scope.alerts).toEqual([])
        scope.redeemInvite();
        httpBackend.flush();
        expect(location.url()).not.toEqual('/login')
        expect(scope.alerts).toEqual([{type: 'danger', msg: 'Invalid email or password!'}])
  });

});
