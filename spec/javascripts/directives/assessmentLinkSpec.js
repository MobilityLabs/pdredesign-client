describe('Directive: assessmentLinks', function() {
  var element,
      isolatedScope,
      AccessRequest,
      $scope,
      $compile,
      $timeout,
      $location,
      $q,
      $httpBackend;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $q       = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    AccessRequest = $injector.get('AccessRequest');

    $scope.link = {
      title: "Report",
      active: false,
      type: "report"
    };

    $scope.assessment = {
      id: 1
    };

    $scope.role = "network_partner";

    element = angular.element('<assessment-links'
          + ' data-title="{{link.title}}"'
          + ' data-active="{{link.active}}"'
          + ' data-type="{{link.type}}"'
          + ' data-id="{{assessment.id}}"'
          + ' data-consensus-id="25"'
          + ' data-role="{{role}}">'
          + ' </assessment-links>');

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  describe('#gotoLocation', function() {
    it('calls createConsensusModal', function() {
      spyOn(isolatedScope, 'createConsensusModal');

      isolatedScope.gotoLocation('/assessments/123/consensus');
      expect(isolatedScope.createConsensusModal).toHaveBeenCalled();
    });

    it('calls requestAccess', function(){
      spyOn(isolatedScope, 'requestAccess');

      isolatedScope.gotoLocation('request_access');
      expect(isolatedScope.requestAccess).toHaveBeenCalled();
    });

    it('goes to location', function(){
      spyOn($location, 'url');

      isolatedScope.gotoLocation('xyz');
      expect($location.url).toHaveBeenCalledWith('xyz');
    });
  });

  describe('#submitAccessRequest', function(){
    it('calls AccessRequest#save', function(){
      isolatedScope.modal = {
        dismiss: function(){}
      };

      $httpBackend.expect('POST', '/v1/assessments/1/access_request', {"roles": ["viewer"]})
        .respond(201, {});

      isolatedScope.submitAccessRequest("viewer");
      $httpBackend.flush();

    });
  });

  describe('#linkActive', function(){
    it('returns active when true', function(){
      expect(isolatedScope.linkActive("true")).toEqual("active");
      expect(isolatedScope.linkActive("something")).toEqual("disabled");
    });
  });

  it('hides the link if the link is null', function(){
     expect(element.find('div.link').hasClass('ng-hide'))
      .toBe(false);
      
    isolatedScope.title = null;
    isolatedScope.$digest();

    expect(element.find('div.link').hasClass('ng-hide'))
      .toBe(true);
  });

});
