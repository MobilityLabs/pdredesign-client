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

    it('will return false if $scope.isReadOnly is true', function() {
        scope.isReadOnly = true;
        expect(scope.assignAnswerToQuestion(answer1, question1)).toEqual(false);
    });

    it('will set question.loading to true if $scope.isReadOnly is false', function() {
        scope.assignAnswerToQuestion(answer1, question1);
        expect(question1.loading).toEqual(true);
    });

    it('sends a post request to the scores endpoint', function() {
        $httpBackend.expectPOST('/v1/assessments/1/responses/1/scores').respond({});
        scope.assignAnswerToQuestion(answer1, question1);
        $httpBackend.flush();
    });

    it('sends the correct Params to Score', function() {
        spyOn(subject, 'save')
        .and.callFake(function(params, score) {
          expect(score.question_id).toEqual(1);
          expect(score.value).toEqual(2);
          expect(score.evidence).toEqual("hello");
          var deferred = q.defer();
          deferred.reject(false);
          return {$promise: deferred.promise};
        });

        scope.assignAnswerToQuestion(answer1, question1);
    });

    describe('resolved promise', function(){
      beforeEach(function(){
        $httpBackend.expectPOST('/v1/assessments/1/responses/1/scores').respond({});
      });

      it('sets loading to false', function() {
        scope.assignAnswerToQuestion(answer1, question1);
        $httpBackend.flush();
        expect(question1.loading).toEqual(false);
      });

      it('sets question score value to the given answer', function() {
        scope.assignAnswerToQuestion(answer1, question1);
        $httpBackend.flush();
        expect(question1.score.value).toEqual(2);
      });
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
