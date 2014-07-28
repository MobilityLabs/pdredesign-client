describe('Controller: AssessmentsCtrl', function() {
  var subject, scope, $httpBackend, SessionService;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $rootScope, $injector) {

    $httpBackend   = $injector.get('$httpBackend');
    SessionService = $injector.get('SessionService');

    spyOn(SessionService, 'getCurrentUser')
      .and.returnValue({role: 'member'});

    scope    = $rootScope.$new();
    subject  = $controller('AssessmentsCtrl', {
      $scope: scope,
      assessments: {}
    });

  }));

  it('#roundNumber rounds', function(){
    expect(scope.roundNumber(50.999)).toEqual(50);
  });

  it('#meetingTime returns formattd date', function(){
    expect(scope.meetingTime(null))
      .toEqual("TBD");

    expect(scope.meetingTime("Jan 1, 1999"))
      .toEqual("1st Jan 1999");
  });

  it('#consensusReportIcon returns correct icon', function() {
    var assessment = {
      consensus: {
        is_complete: true
      }
    };

    expect(scope.consensusReportIcon(assessment))
      .toEqual("fa-check");

  });

});

