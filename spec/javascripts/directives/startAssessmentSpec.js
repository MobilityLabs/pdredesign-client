describe('Directive: startAssessment', function() {
  var $scope, $timeout, $httpBackend, $compile;
  var element, Assessment, SessionService, isolatedScope;

  var user = {role: "facilitator", districts: [{id: 1}]};
  var assessment = {id: 1, due_date: null, rubric_id: null};

  function setupSession(service) {
    spyOn(service, 'getCurrentUser').and.returnValue(user);
    spyOn(service, 'syncUser').and.returnValue(true);
  };

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $httpBackend, $compile) {
    Assessment     = $injector.get('Assessment');
    SessionService = $injector.get('SessionService');
    $timeout       = $injector.get('$timeout');
    $rootScope     = $injector.get('$rootScope');
    $compile       = $injector.get('$compile');
    $q             = $injector.get('$q');
    $scope         = $rootScope.$new();

    setupSession(SessionService);
    
    element = angular.element('<start-assessment></start-assessment>');

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();

  }));

  describe('#text', function() {
    it('returns Start a New Assessment when a user is a district user', function() {
      spyOn(SessionService, 'isNetworkPartner').and.returnValue(false);
      expect(isolatedScope.text()).toEqual('Start a New Assessment');
    });

    it('returns Recommend Assessment when a user is a network Partner', function() {
      spyOn(SessionService, 'isNetworkPartner').and.returnValue(true);
      expect(isolatedScope.text()).toEqual('Recommend Assessment');
    });
  });

  describe('#create', function() {
    beforeEach(function() {
      spyOn(Assessment, 'create').and.callFake(function() {
        return createSuccessDefer($q, assessment);
      });
    });

    it('sets the district_id to selected district', function() {
      isolatedScope.district = { id: 55 };

      isolatedScope.create(assessment);
      expect(assessment.district_id).toEqual(55);  
    });

    it('sets assessment due date ', function() {
      assessment.due_date = null

      var today = new Date();
      $("#due-date").val(today);

      isolatedScope.create(assessment);
      expect(moment(assessment.due_date).format('dddd')).toEqual(moment(today).format('dddd'));
    });

    it('redirects to the assessment assign page when success', function() {
      spyOn(isolatedScope, 'redirectToAssessment');
      isolatedScope.create(assessment);

      expect(isolatedScope.redirectToAssessment).toHaveBeenCalled;
    });

  });
});
