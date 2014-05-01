describe('Service: SessionService', function() {
  var subject;
  var url;
  var scope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $rootScope) {
    localStorage.clear();

    url      = $injector.get('UrlService');
    scope    = $rootScope;
    subject  = $injector.get('SessionService');
  }));

  describe('#softLogin', function() {
    it('logs the localstorage user in', function() {
      var expectedUser = { email: 'some@email.com' }
      spyOn(localStorage, 'getItem').and.returnValue(expectedUser);

      subject.softLogin();
      expect(subject.getCurrentUser().email).toEqual('some@email.com');
    });

    it('doesnt log a previously logged out user', function(){
      spyOn(localStorage, 'getItem').and.returnValue(null);
      subject.softLogin();
      expect(subject.getCurrentUser()).toEqual(null);
    });
  });

  describe('#userIsAuthenticated', function() {
    it('defaults to logged out', function() {
      expect(subject.getUserAuthenticated()).toEqual(false); 
    });
  });

  describe('#getCurrentUser', function() {
    it('defaults to null', function() {
      expect(subject.getCurrentUser()).toEqual(null); 
    });
  });

  describe('#setUserTemplate', function() {
    it('sets the scope template when logged out', function() {
      var s = {};
      subject.setUserTemplate(s, 'loggedin.html', 'loggedout.html');
      expect(s.template).toEqual('loggedout.html'); 
    });

    it('sets the scope template when logged in', function() {
      spyOn(subject, 'getUserAuthenticated').and.returnValue(true);

      var s = {};
      subject.setUserTemplate(s, 'loggedin.html', 'loggedout.html');
      expect(s.template).toEqual('loggedin.html'); 
    });

  });

  describe('#clear', function() {
    it('clears localStorage', function() {
      spyOn(localStorage, 'setItem');
      subject.clear(); 
      expect(localStorage.setItem).toHaveBeenCalledWith('user', null);
    });

    it('sets user and userIsAuthorized', function() {
      subject.clear(); 
      expect(subject.getCurrentUser()).toEqual(null);
      expect(subject.getUserAuthenticated()).toEqual(false);
    });
  });

  describe('#logout', function() {
    var $httpBackend;

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('logs a user out', function() {
      $httpBackend
        .expectDELETE(url.url('users/sign_out'))
        .respond(200, '');

      subject.logout();
      $httpBackend.flush();

      var user = subject.getCurrentUser();
      expect(user).toEqual(null);
      expect(subject.getUserAuthenticated()).toEqual(false);
    });
  });

  describe('#authenticate', function() {
    var $httpBackend;

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('requests to authenticates a user', function() {
      $httpBackend
        .expectPOST(url.url('users/sign_in'))
        .respond({ user: { email: 'some_user' } });

      subject.authenticate('some_user', 'some_password')
      $httpBackend.flush();

      var user = subject.getCurrentUser();

      expect(user.email).toEqual('some_user');
      expect(subject.getUserAuthenticated()).toEqual(true);
    });

    it('fails when authentication fails', function() {
      $httpBackend
        .expectPOST(url.url('users/sign_in'))
        .respond(403, '');

      subject.authenticate('some_user', 'some_password')
      $httpBackend.flush();

      var user = subject.getCurrentUser();
      expect(user).toEqual(null);
      expect(subject.getUserAuthenticated()).toEqual(false);
    });

    it('assigns a user', function() {
      $httpBackend
        .expectPOST(url.url('users/sign_in'))
        .respond({ user: { email: 'some_user' } });

      spyOn(localStorage, 'setItem');

      subject
        .authenticate('some_user', 'some_password')
        .then(function(u) {
          expect(localStorage.setItem)
            .toHaveBeenCalledWith('user', { email: 'some_user' })
        });
      $httpBackend.flush();
    });


    it('resolves a promise', function() {
      $httpBackend
        .expectPOST(url.url('users/sign_in'))
        .respond({ user: { email: 'some_user' } });

      var user;

      subject
        .authenticate('some_user', 'some_password')
        .then(function(u) {
          user = u;
        });
      $httpBackend.flush();
      expect(user.email).toEqual('some_user');
    });

    it('rejects a promise', function() {
      $httpBackend
        .expectPOST(url.url('users/sign_in'))
        .respond(403, '');

      var failed = false;
      subject
        .authenticate('some_user', 'some_password')
        .then(function(u) {
          failed = false;
        }, function(reason) { 
          failed = true;
        });
      $httpBackend.flush();

      expect(failed).toEqual(true);
    });

  });
});
