describe('Controller: SidebarResponseCardCtrl', function() {
  var subject,
      $scope,
      $httpBackend,
      $location,
      Consensus,
      Response;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller) {
      $scope       = $injector.get('$rootScope').$new();
      $httpBackend = $injector.get('$httpBackend');
      $location    = $injector.get('$location');
      Consensus    = $injector.get('Consensus');
      Response     = $injector.get('Response');

      subject  = $controller('SidebarResponseCardCtrl', {
        $scope: $scope
      });

      $scope.assessmentId = 1;
      $scope.responseId   = 2;
  }));

  it('updates questions via #updateScores', function(){
    var expected = [{}, {}];

    $httpBackend.expectGET('/v1/assessments/1/responses/2/scores').respond(expected);
    $scope.updateScores();
    $httpBackend.flush();

    expect($scope.questions.length).toEqual(2);
  });

  it('counts questions correctly via #answeredQuestions', function(){
    $scope.questions = [
      {score: {value: 1}},
      {score: {value: 1}},
      {score: {value: 1}},
      {score:{}}];
    expect($scope.answeredQuestions()).toEqual(3);
  });

  it('counts unanswered questions correctly', function(){
    $scope.questions = [
      {score: {value: 1}},
      {score: {value: 1}},
      {score: {value: 1}},
      {score:{}}];
    expect($scope.unansweredQuestions()).toEqual(1);
  });

  describe('#subject',function() {
    it('returns Response when is response', function() {
      spyOn($scope, 'isResponse').and.returnValue(true);
      expect($scope.subject()).toEqual(Response);
    });

    it('returns Consensus when not response', function() {
      spyOn($scope, 'isResponse').and.returnValue(false);
      expect($scope.subject()).toEqual(Consensus);
    });
  });

  describe('#canSubmit', function() {
    it('returns true if a location is reponse', function(){
      spyOn($scope, 'isResponse').and.returnValue(true);
      expect($scope.canSubmit()).toEqual(true);
    });

    it('returns true if a location is reponse', function(){
      spyOn($scope, 'isResponse').and.returnValue(false);

      $scope.isReadOnly = false;
      expect($scope.canSubmit()).toEqual(true);

      $scope.isReadOnly = true;
      expect($scope.canSubmit()).toEqual(false);
    });
  });


  describe('#isResponse', function() {
    it('returns true if current location is not repsonse', function(){
      spyOn($location, 'url').and.returnValue('stuff');
      expect($scope.isResponse()).toEqual(false);
    });

    it('returns false if current location is repsonse', function(){
      spyOn($location, 'url').and.returnValue('responses/1');
      expect($scope.isResponse()).toEqual(true);
    });
  });


  describe('#questionScoreValue', function() {
    it('returns skipped for a skipped question', function() {
      question = { score: {value: null, evidence: 'something'} };
      expect($scope.questionScoreValue(question)).toEqual('skipped');
    });

    it('returns value for a answered question', function() {
      question = { score: {value: 1, evidence: 'something'} };
      expect($scope.questionScoreValue(question)).toEqual(1);
    });
  });


});
