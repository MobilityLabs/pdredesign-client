describe('Controller: AssessmentsCtrl', function() {
  var subject, $scope, $httpBackend, SessionService;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $rootScope, $injector) {

    $httpBackend   = $injector.get('$httpBackend');
    SessionService = $injector.get('SessionService');

    spyOn(SessionService, 'getCurrentUser')
      .and.returnValue({role: 'member'});

    $scope    = $rootScope.$new();
    subject  = $controller('AssessmentsCtrl', {
      $scope: $scope,
      assessments: {}
    });
  }));

  describe('#removeByTitle', function() {
    it('removes item by title from the list it is passed', function() {
      var items = {
        consensus: { title: "Create Consensus"},
        report :{ title: "View Report"},
        finish :{ title: "Finish & Assign"}
      };

      items = $scope.removeByTitle(items, "Create Consensus");
      expect(items.length).toEqual(2);
      expect(items[0].title).not.toEqual("Create Consensus");
      expect(items[1].title).not.toEqual("Create Consensus");
    });
  });

  describe('#orderLinks', function(){
    var draftLinks, sortedDraftLinks;

    describe('#draft status', function() {

      it('calls $scope.removeByTitle() on Create Consensus', function() {
        spyOn($scope, 'removeByTitle')
        $scope.orderLinks(draftLinks, 'draft')
        expect($scope.removeByTitle).toHaveBeenCalled();
      });

      beforeEach(inject(function($injector) {
        draftLinks = {
          consensus :{title:"Create Consensus"},
          report :{title:"View Report"},
          finish :{title:"Finish & Assign"}
        };

        sortedDraftLinks = $scope.orderLinks(draftLinks, 'draft');
      }));

      it('sets Finish & Assign first', function() {
        expect(sortedDraftLinks[0].title).toEqual("Finish & Assign");
      });

      it('sets View Report to last', function() {
        expect(sortedDraftLinks[1].title).toEqual("View Report");
      });
    });

    describe('#assessment status', function() {
      var assessmentLinks, sortedAssessmentLinks;

      describe('#facilitator', function() {
        beforeEach(inject(function($injector) {

          assessmentLinks = {
            consensus: { title: "Create Consensus"},
            report: { title: "View Report"},
            dashboard: {title: "View Dashboard"}
          };
          sortedAssessmentLinks = $scope.orderLinks(assessmentLinks, '');
        }));

        it('sets View Dashboard first', function() {
          expect(sortedAssessmentLinks[0].title).toEqual("View Dashboard");
        });

        it('sets View Report to last', function() {
          expect(sortedAssessmentLinks[2].title).toEqual("View Report");
        });
      });

      describe('#member participant', function() {
        beforeEach(inject(function($injector) {

          assessmentLinks = {
            report:{title:"View Report"},
            action:{title:"Complete Survey"}
          };

          sortedAssessmentLinks = $scope.orderLinks(assessmentLinks, '');
        }));

        it('sets Complete Survey first', function() {
          expect(sortedAssessmentLinks[0].title).toEqual("Complete Survey");
        });

        it('sets View Report last', function() {
          expect(sortedAssessmentLinks[1].title).toEqual("View Report");
        });
      });
    });

    describe('#consensus status', function() {
      var consensusLinks, sortedConsensusLinks;

      beforeEach(inject(function($injector) {
        consensusLinks = {
          consensus: { title: "Consensus"},
          report: { title: "View Report"},
          dashboard: {title: "View Dashboard"}
        };

        sortedConsensusLinks = $scope.orderLinks(consensusLinks, '');
      }));

      it('sets View Dashboard first', function() {
        expect(sortedConsensusLinks[0].title).toEqual("View Dashboard");
      });

      it('sets View Report to last', function() {
        expect(sortedConsensusLinks[2].title).toEqual("View Report");
      });

    });
  });

  describe('#districtOptions', function(){
    it('returns all unique districts', function(){
     var assessments = [
        {district_name: 'first'},
        {district_name: 'first'},
        {district_name: 'second'},
        {district_name: 'second'}
      ];

      var districts = $scope.districtOptions(assessments);
      expect(districts).toEqual(['first', 'second'])
    });
  });
  describe('#statusesOptions', function(){
    it('returns all unique statuses', function(){
     var assessments = [
        {status: 'draft'},
        {status: 'consensus'},
        {status: 'draft'},
        {status: 'consensus'}
      ];

      var statuses = $scope.statusesOptions(assessments);
      expect(statuses).toEqual(['draft', 'consensus'])
    });
  });

  describe('#permissionsFilter', function(){
    it('Organizer should return is_facilitator true', function() {
      var permission = $scope.permissionsFilter('Organizer');
      expect(permission).toEqual({ is_facilitator : true })
    });

    it('Participant should return is_participant true', function() {
      var permission = $scope.permissionsFilter('Observer');
      expect(permission).toEqual({ is_participant : true  })
    });
  });

  it('#roundNumber rounds', function(){
    expect($scope.roundNumber(50.999)).toEqual(50);
  });

  it('#meetingTime returns formattd date', function(){
    expect($scope.meetingTime(null))
      .toEqual("TBD");

    expect($scope.meetingTime("Jan 1, 1999"))
      .toEqual("1st Jan 1999");
  });

  it('#consensusReportIcon returns correct icon', function() {
    var assessment = {
      consensus: {
        is_complete: true
      }
    };

    expect($scope.consensusReportIcon(assessment))
      .toEqual("fa-check");

  });

});
