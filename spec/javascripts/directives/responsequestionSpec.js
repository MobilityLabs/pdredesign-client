describe('Directive: responsequestion', function() {
  var element,
    isolatedScope,
    $scope,
    $compile,
    $timeout,
    $q,
    $httpBackend;

  var score1 = {id: 1, evidence: "hello", value: 1, editMode: null};
  var question1 = {id: 1, score: score1 };
  var answer1 = {id: 1, value: 2};

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $injector) {

    $scope   = $rootScope.$new();
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    $q = $injector.get('$q');

    $httpBackend.when('GET', '/v1/assessments/1/participants/all').respond([{id: 1}]);
    element = angular.element('<responsequestion data-assessment-id=1 data-response-id=1></responsequestion>');
    $compile(element)($scope);
    $scope.$digest();
    isolateScope = element.isolateScope();
  }));

  it('save button is not disabled with evidence present', function() {
    expect(isolateScope.invalidEvidence(question1)).toEqual(false)
  });

  it('save button is disabled with no evidence', function() {
    var score2 = {id: 1, evidence: "", value: 1, editMode: null};
    var question2 = {id: 1, score: score2 };
    expect(isolateScope.invalidEvidence(question2)).toEqual(true)
  });

  it('hides key_question popover when it is not included', function() {
    var categories =  [{id: 1, name: "Category",
                        questions: [{ number: 2, key_question: null,
                          score: { evidence: null }
                        }]
                      }]

    isolateScope.categories = categories;
    isolateScope.$digest();
    expect(element.find('sample-evidence.ng-isolate-scope').hasClass('ng-hide')).toEqual(true);

  });

  describe('#ResponseGET', function() {
    var subject;
    var categories = [1, 2, 3];

    beforeEach(inject(function($injector, Response) {
      subject = Response;
      spyOn(subject, 'get')
        .and.callFake(function(params) {
          var deferred = $q.defer();
          deferred.resolve({categories: categories});
          return {$promise: deferred.promise};
      });
        $timeout.flush();
    }));

    it('correctly calls function', function() {
      expect(subject.get).toHaveBeenCalled();
    });

    it('gets data on callback and sets categories', function() {
      expect(isolateScope.categories).toEqual(categories);
    });

  });
});
