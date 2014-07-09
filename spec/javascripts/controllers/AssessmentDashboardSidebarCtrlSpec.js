describe('Controller: AssessmentDashboardSidebarCtrl', function() {
  var subject, scope, Reminder, q;
  var today = new Date();
  var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  var lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);


  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller, $rootScope) {

      scope    = $rootScope.$new();
      q        = $injector.get('$q');
      Reminder = $injector.get('Reminder');

      subject  = $controller('AssessmentDashboardSidebarCtrl', {
        $scope: scope
      });
  }));

  it('sends a reminder to the server', function(){ 
    spyOn(Reminder, 'save')
      .and.callFake(function(params, values) {
        expect(params.assessment_id).toEqual(1);
        expect(values.message).toEqual("Something");

        var deferred = q.defer();
        deferred.resolve({});
        return {$promise: deferred.promise};
    });
    scope.id = 1;
    scope.sendReminder("Something");
  });

  it('postMeetingDate should be false for meeting date that is nextWeek', function() {
    scope.assessment.meeting_date = nextWeek;
    expect(scope.postMeetingDate()).toEqual(false);
  });

  it('preMeetingDate should be true for meeting date that is nextWeek', function() {
    scope.assessment.meeting_date = nextWeek;
    expect(scope.preMeetingDate()).toEqual(true);
  });

  it('noMeetingDate should be true for meeting date that is null', function() {
    scope.assessment.meeting_date = null;
    expect(scope.noMeetingDate()).toEqual(true);
  });

  it("reportPresent should be true if consensus has been submitted ", function() {
    scope.assessment.submitted_at = "something";
    expect(scope.reportPresent()).toEqual(true);
  });

  it("reportPresent should be false if consensus submitted_at is null", function() {
    scope.assessment.submitted_at = null;
    expect(scope.reportPresent()).toEqual(false);
  });

});
