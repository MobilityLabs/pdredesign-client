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
    $scope.isReadOnly = false;
    $scope.iConsensus = true;

    element = angular.element("<skip-question question='question' is-consensus='iConsensus' is-read-only='{{isReadOnly}}' response-id=1 assessment-id=2></skip-question>");
    $compile(element)($scope);
    $scope.$digest();
    console.log(element.find('.answer-row'));
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

  it('correctly sets isReadOnly correctly', function(){
    expect(isolatedScope.isReadOnly).toEqual('false');
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
    it('sets question skipped to false when is isReadOnly is true', function(){
      isolatedScope.isReadOnly = "true";
      isolatedScope.skipQuestion(isolatedScope.question, isolatedScope.question.score);
      expect(isolatedScope.question.skipped).toEqual(false);
    });
  });


});
