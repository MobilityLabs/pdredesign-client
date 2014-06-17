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

  it('saveEvidence will set score.editMode to true', function() {
    scope.saveEvidence(score1);
    expect(score1.editMode).toEqual(true);
  });

  it('editAnswer will set score.editMode to false', function() {
    scope.editAnswer(score1);
    expect(score1.editMode).toEqual(false);
  });

  describe('#assignAnswerToQuestion', function() {
    var $httpBackend, subject;
    beforeEach(inject(function($injector, Score) {
      subject = Score;
      $httpBackend = $injector.get('$httpBackend');
      scope.isReadOnly = false;
    }));

    it('will set question.loading to true', function() {
        scope.assignAnswerToQuestion(answer1, question1);
        expect(question1.loading).toEqual(true);
    });

    it('sends a post request to the scores endpoint', function() {
        $httpBackend.expectPOST('/v1/assessments/1/responses/1/scores').respond({});
        scope.assignAnswerToQuestion(answer1, question1);
        $httpBackend.flush();
    });

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
