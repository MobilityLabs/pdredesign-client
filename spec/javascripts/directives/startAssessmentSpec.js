describe('Directive: startAssessment', function() {
  var $scope, $timeout, $httpBackend, $compile, $modal, $location, $httpBackend;
  var element, Assessment, SessionService, isolatedScope;

  var user = {role: "facilitator", districts: [{id: 1}]};
  var assessment = {id: 1, due_date: null, rubric_id: null};

  function setupSession(service) {
    spyOn(service, 'getCurrentUser').and.returnValue(user);
    spyOn(service, 'syncUser').and.returnValue(true);
  };

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $compile) {
    Assessment     = $injector.get('Assessment');
    SessionService = $injector.get('SessionService');
    $timeout       = $injector.get('$timeout');
    $rootScope     = $injector.get('$rootScope');
    $compile       = $injector.get('$compile');
    $q             = $injector.get('$q');
    $modal         = $injector.get('$modal');
    $location      = $injector.get('$location');
    $httpBackend   = $injector.get('$httpBackend');
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

  describe('#openStartAssessmentModal', function() {
    it('is called when directive element is clicked', function() {
      spyOn(isolatedScope, 'openStartAssessmentModal')
      element.click();
      expect(isolatedScope.openStartAssessmentModal).toHaveBeenCalled();
    });

    it('creates a modal', function() {
      spyOn(isolatedScope, 'setDatePicker')
      expect(isolatedScope.modal).toBeUndefined();
      isolatedScope.openStartAssessmentModal();
      expect(isolatedScope.modal).not.toBeUndefined();
    });

    it('it calls setDatePicker', function() {
      spyOn(isolatedScope, 'setDatePicker')
      isolatedScope.openStartAssessmentModal();
      expect(isolatedScope.setDatePicker).toHaveBeenCalled();
    });

  });

  describe('#redirectToAssessment', function() {
    it('calls scope close', function() {
      spyOn(isolatedScope, 'close');
      isolatedScope.redirectToAssessment(assessment);
      expect(isolatedScope.close).toHaveBeenCalled();
    });

    it('redirects page to assessment assign', function() {
      spyOn(isolatedScope, 'close');
      isolatedScope.redirectToAssessment(assessment);
      expect($location.path()).toEqual('/assessments/1/assign');
    });
  });

  describe('#successfull create', function(){
    beforeEach(function() {
      isolatedScope.district = { id: 55 };
      spyOn(isolatedScope, 'redirectToAssessment');
      spyOn(isolatedScope, 'success');
      element.click();
      $httpBackend.expectPOST('/v1/assessments', assessment)
      .respond(assessment);
      isolatedScope.create(assessment);
      isolatedScope.$digest();
      $httpBackend.flush();
    });

    it('sets the district_id to selected district', function() {
      expect(assessment.district_id).toEqual(55);
    });

    it('calls redirectToAssessment', function() {
      expect(isolatedScope.redirectToAssessment).toHaveBeenCalled();
    });

    it('calls scope success', function() {
      expect(isolatedScope.success).toHaveBeenCalled();
    });

  });

  describe('#create', function() {
    beforeEach(function() {
      spyOn(Assessment, 'create').and.callFake(function() {
        return createSuccessDefer($q, assessment);
      });
    });

    it('sets assessment due date ', function() {
      assessment.due_date = null
      var today = new Date();
      $("#due-date").val(today);
      isolatedScope.create(assessment);
      expect(moment(assessment.due_date).format('dddd')).toEqual(moment(today).format('dddd'));
    });

  });
});
