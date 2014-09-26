describe('Directive: organizationSelect', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $httpBackend;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');


    $httpBackend.when('GET', '/v1/organizations/1').respond({id: 1, name: 'some org'});

    $scope.tmp = 1;
    $scope.messages = {};

    element = angular.element("<organization-select organization-id='tmp' messages='messages'></organization-select>");

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  it('sets the organizationId correctly', function() {
    expect(isolatedScope.organizationId).toEqual(1);
  });

  describe('#firstLoad', function(){
    it('is set to true by default', function() {
      expect(isolatedScope.firstLoad).toEqual(true);
    });

    it('is set to false when updateOrganizationData has no param', function() {
      isolatedScope.updateOrganizationData();
      expect(isolatedScope.firstLoad).toEqual(false);
    });

    it('stays true when updateOrganizationData has valid param', function() {
      isolatedScope.updateOrganizationData(1);
      expect(isolatedScope.firstLoad).toEqual(true);
    });

  });

  describe('#performAction', function(){
    it('sets firstLoad to false after called', function() {
      expect(isolatedScope.firstLoad).toEqual(true);
      isolatedScope.performAction({ name: 'test' });
      expect(isolatedScope.firstLoad).toEqual(false);
    });

    it('calls nothing if firstLoad has not been set to false', function() {
      spyOn(isolatedScope, 'createOrganization');
      isolatedScope.performAction({ name: 'test' });
      expect(isolatedScope.createOrganization).not.toHaveBeenCalledWith({name: 'test'});
    });

    it('calls createOrganization when new org', function() {
      isolatedScope.firstLoad = false;
      spyOn(isolatedScope, 'createOrganization');
      isolatedScope.performAction({ name: 'test' });
      expect(isolatedScope.createOrganization).toHaveBeenCalledWith({name: 'test'});
    });

    it('calls updateUserOrganization when existing org', function(){
      isolatedScope.firstLoad = false;
      spyOn(isolatedScope, 'updateUserOrganization');
      isolatedScope.performAction({ id:1, name: 'test' });
      expect(isolatedScope.updateUserOrganization).toHaveBeenCalledWith({id: 1, name: 'test'});
    });
  });

  describe('#updateUserOrganization', function() {
    it('posts to the api', function() {
      $httpBackend
        .expectPUT('/v1/user', {organization_ids: 98})
        .respond({});

      isolatedScope.updateUserOrganization({id: 98, name: 'something'});
      $httpBackend.flush();
    });

    it('sets the organizationId', function() {
      isolatedScope.updateUserOrganization({id: 98, name: 'something'});
      expect(isolatedScope.organizationId).toEqual(98);
    });

    it('updates messages', function() {
      $httpBackend.when('PUT', '/v1/user').respond({});
      isolatedScope.updateUserOrganization({id: 98, name: 'something'});

      $httpBackend.flush();
      expect(isolatedScope.messages.msg).toEqual('Profile updated');
    });

    it('explicitly sends null when an org is cleared', function(){
      $httpBackend
      .expectPUT('/v1/user', {organization_ids: null})
      .respond({});

      isolatedScope.updateUserOrganization({});
      $httpBackend.flush();
    });

  });

});
