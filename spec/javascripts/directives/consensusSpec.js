describe('Directive: consensus', function() {
  var scope, element, compile, timeout;
  var score1 = {id: 1, evidence: "hello", value: 1, editMode: null};
  var question1 = {id: 1, score: score1 };
  var answer1 = {id: 1, value: 2};

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $compile, $timeout, $q) {
    scope   = $rootScope.$new();
    element = angular.element('<consensus data-assessment-id=1 data-response-id=1></consensus>');
    timeout = $timeout;
    q = $q;

    $compile(element)(scope);
    scope.$digest();
    scope = scope.$$childTail
  }));


  it('isConsensus will be true by default ', function() {
      expect(scope.isConsensus).toEqual(true);
  });

  describe('#assignAnswerToQuestion', function() {
    var $httpBackend, subject;
    beforeEach(inject(function($injector, Score) {
      subject = Score;
      $httpBackend = $injector.get('$httpBackend');
      scope.isReadOnly = false;
    }));

    it('will return false if $scope.isReadOnly is true', function() {
        scope.isReadOnly = true;
        expect(scope.assignAnswerToQuestion(answer1, question1)).toEqual(false);
    });

    it('isAlert should be true if score evidence is missing', function() {
        var score2 = {id: 1, evidence: "", value: 1, editMode: null};
        var question2 = {id: 1, score: score2 };
        scope.assignAnswerToQuestion(answer1, question2)
        expect(question2.isAlert).toEqual(true);
    });

  });

  describe('#ConsensusGET', function() {
    var $httpBackend, subject;
    var categories = [1, 2, 3]

    beforeEach(inject(function($injector, Consensus) {
      subject = Consensus;
      $httpBackend = $injector.get('$httpBackend');
      spyOn(subject, 'get')
        .and.callFake(function(params) {
          var deferred = q.defer();
          deferred.resolve({scores: [score1], categories: categories, is_completed: true, participant_count: 5});
          return {$promise: deferred.promise};
      });
        timeout.flush();
    }));

    it('correctly calls function', function() {
      expect(subject.get).toHaveBeenCalled();
    });

    it('gets data on callback and sets scores, data, categories, isReadOnly, and participantCount', function() {
        expect(scope.scores).toEqual([score1]);
        expect(scope.data).toEqual(categories);
        expect(scope.categories).toEqual(categories);
        expect(scope.isReadOnly).toEqual(true);
        expect(scope.participantCount).toEqual(5);
    });

  });


});
