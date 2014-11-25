describe('Directive: walkThrough', function() {
  var $scope,
      $compile,
      $httpBackend,
      $modal,
      $state,
      element,
      isolatedScope;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope       = $rootScope.$new();
    $compile     = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $modal       = $injector.get('$modal');
    $state       = $injector.get('$state');

    element = angular.element('<walk-through id="42"></walk-through>');
    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  it('assigns the correct walk through id', function() {
    expect(isolatedScope.id).toEqual('42');
  });

  it('queries the api for an update', function() {
    $httpBackend.expectGET('/v1/walk_throughs/42').respond({});
    isolatedScope.fetchWalkthrough(42);
    $httpBackend.flush();
  });

  it('logs a walkthrough view', function() {
    $httpBackend.expectPOST('/v1/walk_throughs/42/viewed').respond({});
    isolatedScope.logWalkThroughView(42);
    $httpBackend.flush();
  });

  it('#autoLaunchModal calls #fetchAndLaunch when the current state is assessments', function() {
    spyOn(isolatedScope, 'fetchAndLaunch');
    spyOn($state, 'is').and.returnValue(true);
    isolatedScope.autoLaunchModal();
    expect(isolatedScope.fetchAndLaunch).toHaveBeenCalledWith('42');
  });

  describe('#fetchAndLaunch', function() {
    it('shows the modal when a walkthrough has not been viewed', function(){ 
      $httpBackend.expectGET('/v1/walk_throughs/42').respond({'viewed': false});
      spyOn(isolatedScope, 'showModal');
      expect(isolatedScope.showModal).toHaveBeenCalled();
    });
  });

});
