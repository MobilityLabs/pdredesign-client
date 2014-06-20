describe('Service: ResponseHelper', function() {
  var subject, scope, $httpBackend;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $compile, $timeout, $q, ResponseHelper, $injector) {
    subject = ResponseHelper;
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');

  }));

  it('editAnswer will set score.editMode to false', function() {
    var score = {editMode: true};
    subject.editAnswer(score);
    expect(score.editMode).toEqual(false);
  });

  it('saveEvidence will set score.editMode to true', function() {
    var score = {editMode: false};
    subject.saveEvidence(score);
    expect(score.editMode).toEqual(true);
  });

  describe('#answerCount', function() {
    var scores = [{question_id: 1, value: 1},
                  {question_id: 2, value: 4},
                  {question_id: 1, value: 4},
                  {question_id: 1, value: 4}];

    it('return the count for a question id and answer id', function() {
      expect(subject.answerCount(scores, 1, 4)).toEqual(2);
      expect(subject.answerCount(scores, 1, 1)).toEqual(1);
      expect(subject.answerCount(scores, 1, 0)).toEqual(0);
      expect(subject.answerCount(scores, 1, undefined)).toEqual(0);
    });
  });

  describe('#assignAnswerToQuestion', function() {
    var scoreResource;
    var score1    = {id: 1, evidence: "hello", value: 1, editMode: null};
    var question1 = {id: 1, score: score1 };
    var answer1   = {id: 1, value: 2};

    beforeEach(inject(function($injector, Score) {
      scope.isReadOnly = false;
      scoreResource = Score;
      scope.responseId = 1;
      scope.assessmentId = 1;
    }));

    it('will set question.loading to true if $scope.isReadOnly is false', function() {
      subject.assignAnswerToQuestion(scope, answer1, question1);
      expect(question1.loading).toEqual(true);
    });

    it('will set question.loading to true', function() {
        subject.assignAnswerToQuestion(scope, answer1, question1);
        expect(question1.loading).toEqual(true);
    });

    it('sends a post request to the scores endpoint', function() {
        $httpBackend.expectPOST('/v1/assessments/1/responses/1/scores').respond({});
        subject.assignAnswerToQuestion(scope, answer1, question1);
        $httpBackend.flush();
    });


    it('sends the correct Params to Score', function() {
        spyOn(scoreResource, 'save')
        .and.callFake(function(params, score) {
          expect(score.question_id).toEqual(1);
          expect(score.value).toEqual(2);
          expect(score.evidence).toEqual("hello");
          var deferred = q.defer();
          deferred.reject(false);
          return {$promise: deferred.promise};
        });

        subject.assignAnswerToQuestion(scope, answer1, question1);
    });

    describe('resolved promise', function(){
      beforeEach(function(){
        $httpBackend.expectPOST('/v1/assessments/1/responses/1/scores').respond({});
      });

      it('sets loading to false', function() {
        subject.assignAnswerToQuestion(scope, answer1, question1);
        $httpBackend.flush();
        expect(question1.loading).toEqual(false);
      });

      it('sets question score value to the given answer', function() {
        subject.assignAnswerToQuestion(scope, answer1, question1);
        $httpBackend.flush();
        expect(question1.score.value).toEqual(2);
      });
    });


  });



});
