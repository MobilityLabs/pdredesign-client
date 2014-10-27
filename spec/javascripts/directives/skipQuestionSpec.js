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
    //Set Post to return .is_completed



    element = angular.element("<skip-question question='question' is-read-only='{{isReadOnly}}' response-id=1 assessment-id=2></skip-question>");
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

  it('sets isReadOnly as a string', function(){
    expect(isolatedScope.isReadOnly).toEqual('true');
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
    it('sets question skipped to true when is isReadOnly is false', function(){
      isolatedScope.isReadOnly = false;
      isolatedScope.skipQuestion(isolatedScope.question, isolatedScope.question.score);
      expect(isolatedScope.question.skipped).toEqual(true);
    });

  });


});
