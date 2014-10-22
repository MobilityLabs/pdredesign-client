describe('Directive: scoreEvidence', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $httpBackend;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $scope.question = {id: 5};
    $scope.scores = [{question_id: 5}, {question_id:5}, {question_id:6}];
    $scope.isConsensus = true;

    element = angular.element("<score-evidence question-id='{{question.id}}' scores='scores'></score-evidence>");
    $compile(element)($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();

  }));

  it('sets questionId correctly', function(){
    expect(isolatedScope.questionId).toEqual('5');
  });

  it('sets scores correctly', function(){
    expect(isolatedScope.scores).toEqual($scope.scores);
  });

  it('displays filter correctly', function(){
    expect(element.find('.evidence').length).toEqual(2);
  });

});
