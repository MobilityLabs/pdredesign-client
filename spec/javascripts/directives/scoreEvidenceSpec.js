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
    $scope.scores = [{question_id: 1}, {question_id:1}, {question_id:2}];
    $scope.isConsensus = true;

    element = angular.element("<score-evidence question='question' scores='scores'></score-evidence>");
    $compile(element)($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();

  }));

  it('sets question.id correctly', function(){
    expect(isolatedScope.question.id).toEqual(5);
  });

});
