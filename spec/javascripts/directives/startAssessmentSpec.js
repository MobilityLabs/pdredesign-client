describe('Directive: startAssessment', function() {
  var scope, element, compile, timeout, AssessmentResource;
  var user = {role: "facilitator"};
  var assessment = {id: 1, due_date: null, rubric_id: null};
  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $compile, $timeout, $q, Rubric, $httpBackend, Assessment) {
    $httpBackend.expectGET('/v1/rubrics').respond([{id: 2, name: "PD Readiness Rubric v3.0", version: "3.0", enabled: true}]);
    AssessmentResource = Assessment;
    scope   = $rootScope.$new();
    element = angular.element('<start-assessment></start-assessment>');
    timeout = $timeout;
    q = $q;
    $compile(element)(scope);
    scope.$digest();
    scope = scope.$$childHead;

  }));


  describe('#create', function(){

    it('sets assessment rubric_id to scope.rubric.id', function() {
      scope.rubric = {id: 2};
      scope.create(assessment);
      expect(assessment.rubric_id).toEqual(2);
    });

    it('sets assessment due date ', function() {
      var today = new Date();
      $("#due-date").val(today);
      scope.create(assessment);
      expect(assessment.due_date).toEqual(moment(today).toISOString());
    });

    it('callbacks functions success and redirectToAssessment are called', function() {
      spyOn(scope, 'success');
      spyOn(scope, 'redirectToAssessment');
      spyOn(AssessmentResource, 'create')
        .and.callFake(function() {
          var deferred = q.defer();
          deferred.resolve({id: 1});
          return {$promise: deferred.promise};
        });
          scope.create(assessment);
          scope.$apply()
          expect(scope.success).toHaveBeenCalled();
          expect(scope.redirectToAssessment).toHaveBeenCalled();
    });

  });

});
