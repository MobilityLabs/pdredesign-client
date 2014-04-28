describe('Directive: userLogin', function() {
  var scope;
  var element;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $compile) {
    scope   = $rootScope;
    element = angular.element('<user-login></user-login>');
    $compile(element)(scope);
    scope.$digest();
  }));

  describe('#authenticate', function() {
    var session;

    beforeEach(inject(function(SessionService, $q) {
      session = SessionService;

      spyOn(SessionService, 'authenticate')
        .and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        });
    }));

    it('calls authenticate on SessionService', 
      inject(function(SessionService, $q) {
        element
          .find("#email")
          .val('test@user.com')
          .trigger('input');

        element
          .find("#password")
          .val('somepass')
          .trigger('input');

       element
          .find("input#authenticate")
          .click();

        expect(session.authenticate)
          .toHaveBeenCalledWith('test@user.com', 'somepass');
    }));

    it('redirects to the homepage', inject(
      function(SessionService, $location, $q) {
        element
          .find("#email")
          .val('test@user.com')
          .trigger('input');

        element
          .find("#password")
          .val('somepass')
          .trigger('input');

        spyOn($location, 'path');
        element
          .find("input#authenticate")
          .click();

        expect($location.path).toHaveBeenCalledWith('/');
      }));

  });

});
