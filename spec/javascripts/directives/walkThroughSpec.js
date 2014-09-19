describe('Directive: walkThrough', function() {
  var $scope,
      $compile,
      $httpBackend,
      $modal,
      element,
      isolatedScope;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope       = $rootScope.$new();
    $compile     = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $modal       = $injector.get('$modal');

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
    isolatedScope.updateWalkThrough(42);
    $httpBackend.flush();
  });

  it('opens a new modal', function() {
    spyOn($modal, 'open').and.callThrough();
    isolatedScope.showModal();

    expect($modal.open).toHaveBeenCalled();
  });

  it('sends a view tacking post after close', function() {

    spyOn($modal, 'open').and.callThrough();
    isolatedScope.showModal();
    spyOn(isolatedScope.modal, 'dismiss').and.returnValue(true);
    
    $httpBackend.expectPOST('/v1/walk_throughs/42/viewed').respond({});
    $httpBackend.expectGET('/v1/walk_throughs/42').respond({});
    isolatedScope.close();
    $httpBackend.flush();
  });

});
