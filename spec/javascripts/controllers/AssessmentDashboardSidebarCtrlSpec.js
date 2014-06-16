describe('Controller: AssessmentDashboardSidebarCtrl', function() {
  var subject, scope;
  var today = new Date();
  var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  var lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);


  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller, $rootScope) {

      scope = $rootScope.$new();
      subject  = $controller('AssessmentDashboardSidebarCtrl', {
        $scope: scope
      });
  }));

  it('postMeetingDate should be false for meeting date that is nextWeek', function() {
    scope.assessment.meeting_date = nextWeek
    expect(scope.postMeetingDate()).toEqual(false)
  });

  it('preMeetingDate should be true for meeting date that is nextWeek', function() {
    scope.assessment.meeting_date = nextWeek
    expect(scope.preMeetingDate()).toEqual(true)
  });

  it('noMeetingDate should be true for meeting date that is null', function() {
    scope.assessment.meeting_date = null
    expect(scope.noMeetingDate()).toEqual(true)
  });

  it("reportPresent should be true if consensus has been submitted ", function() {
    scope.assessment.consensus = {}
    scope.assessment.consensus.submitted_at = "something"
    expect(scope.reportPresent()).toEqual(true)
  });

  it("reportPresent should be false if consensus submitted_at is null", function() {
    scope.assessment.consensus = {}
    scope.assessment.consensus.submitted_at = null
    expect(scope.reportPresent()).toEqual(false)
  });

});
