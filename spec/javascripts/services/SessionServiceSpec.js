describe('Service: SessionService', function() {
  var app;
  var subject;

  beforeEach(module('PDRClient', []));

  beforeEach(inject(function($injector) {
    subject = $injector.get('SessionService');
  }));

  describe('userIsAuthenticated', function() {
    it('defaults to logged out', function() {
      expect(subject.getUserAuthenticated()).toEqual(false); 
    });
  });
});
