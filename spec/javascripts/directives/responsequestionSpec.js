describe('Directive: responsequestion', function() {
  var scope, element, compile, timeout;
  var score1 = {id: 1, evidence: "hello", value: 1, editMode: null};
  var question1 = {id: 1, score: score1 };
  var answer1 = {id: 1, value: 2};

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $compile, $timeout, $q) {
    scope   = $rootScope.$new();
    element = angular.element('<responsequestion data-assessment-id=1 data-response-id=1></responsequestion>');
    timeout = $timeout;
    q = $q;
    $compile(element)(scope);
    scope.$digest();
    scope = scope.$$childTail
  }));

  it('save button is not disabled with evidence present', function() {
    expect(scope.invalidEvidence(question1)).toEqual(false)
  });

  it('save button is disabled with no evidence', function() {
    var score2 = {id: 1, evidence: "", value: 1, editMode: null};
    var question2 = {id: 1, score: score2 };
    expect(scope.invalidEvidence(question2)).toEqual(true)
  });

  describe('#ResponseGET', function() {
    var $httpBackend, subject;
    var categories = [1, 2, 3]

    beforeEach(inject(function($injector, Response) {
      subject = Response;
      $httpBackend = $injector.get('$httpBackend');
      spyOn(subject, 'get')
        .and.callFake(function(params) {
          var deferred = q.defer();
          deferred.resolve({categories: categories});
          return {$promise: deferred.promise};
      });
        timeout.flush();
    }));

    it('correctly calls function', function() {
      expect(subject.get).toHaveBeenCalled();
    });

    it('gets data on callback and sets categories', function() {
      expect(scope.categories).toEqual(categories);
    });

  });
});
