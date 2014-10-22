describe('Directive: scoreCount', function() {
  var $scope,
      element,
      isolatedScope,
      $compile,
      $timeout,
      $httpBackend,
      $q;

  var score1    = {id: 1, evidence: 'hello', value: 1, editMode: null};
  var question1 = {id: 1, score: score1, mode: 2 };
  var answer1   = {id: 1, value: 2};
  var scores = [{question_id: 1}, {question_id:2}, {question_id:2}];

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new();
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');
    $q = $injector.get('$q');
    $httpBackend = $injector.get('$httpBackend');
    $scope.answer = answer1;
    $scope.question = question1;
    $scope.isReadOnly = true;
    $scope.scores = scores;
    $scope.participantCount = 3;
    $scope.answerCount = 2;

    element = angular.element("<score-count "
                + "answer='answer'"
                + "question='question'"
                + "is-read-only='{{isReadOnly}}'"
                + "participant-count='{{participantCount}}'"
                + "answer-count='{{answerCount}}'>"
                + "</score-count>");

    $compile(element)($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();
  }));

  it('sets answer correctly as = binding', function() {
    expect(isolatedScope.answer).toEqual($scope.answer);
  });

  it('sets question correctly as = binding', function() {
    expect(isolatedScope.question).toEqual($scope.question);
  });

  it('sets isReadOnly correctly as @ string', function() {
    expect(isolatedScope.isReadOnly).toEqual('true');
  });

  it('sets answerCount correctly as @ string', function() {
    expect(isolatedScope.answerCount).toEqual('2');
  });

  it('sets participantCount correctly as @ string', function() {
    expect(isolatedScope.participantCount).toEqual('3');
  });

  it('sets participantCount correctly as @ string', function() {
    console.log(element)
    // expect(isolatedScope.participantCount).toEqual('3');
  });

});
