describe('Directive: skipQuestion', function() {
  var element,
      isolatedScope,
      $scope,
      $compile;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope       = $rootScope.$new({});
    $compile     = $injector.get('$compile');

    $scope.question = {
      id: 1,
      skipped: false,
      score: { value: null, evidence: null }
    };

    element = angular.element("<skip-question question='question' response-id=1 assessment-id=2></skip-question>");
    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  it('sets the responseId correctly', function(){
    expect(isolatedScope.responseId).toEqual('1');
  });

  it('sets the assessmentId correctly', function(){
    expect(isolatedScope.assessmentId).toEqual('2');
  });

  it('sets a question that contains a score', function(){
    expect(isolatedScope.question.score.value).toEqual(null);
  });

  describe('#skipped', function(){

    it('returns false when a question doesnt have an answer', function(){
      expect(isolatedScope.skipped({})).toEqual(false);
    });

    it('returns false when evidence null when ', function(){
      expect(isolatedScope.skipped(isolatedScope.question)).toEqual(false);
    });

    it('returns true when evidence is present and value is null ', function(){
      isolatedScope.question.score.evidence = '';
      expect(isolatedScope.skipped(isolatedScope.question)).toEqual(true);
    });

    it('returns false when evidence is present and value is not null ', function(){
      isolatedScope.question.score.evidence = '';
      isolatedScope.question.score.value = 1;
      expect(isolatedScope.skipped(isolatedScope.question)).toEqual(false);
    });

  });

  describe('#skipQuestionSaveEvidence', function(){
    it('sets score evidence to an empty string when evidence is null ', function(){
      expect(isolatedScope.question.score.evidence).toEqual(null);
      isolatedScope.skipQuestionSaveEvidence(isolatedScope.question.score)
      expect(isolatedScope.question.score.evidence).toEqual('');
    });

    it('sets score editMode to true', function(){
      isolatedScope.skipQuestionSaveEvidence(isolatedScope.question.score)
      expect(isolatedScope.question.score.editMode).toEqual(true);
    });

  });

  describe('#skipQuestion', function(){
    it('sets question skipped to true', function(){
      isolatedScope.skipQuestion(isolatedScope.question, isolatedScope.question.score);
      expect(isolatedScope.question.skipped).toEqual(true);
    });

  });


});
