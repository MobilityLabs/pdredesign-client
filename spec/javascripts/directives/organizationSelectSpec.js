describe('Directive: organizationSelect', function() {
  var element,
      isolatedScope,
      $scope,
      $compile, 
      $timeout, 
      $q, 
      $httpBackend;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $q       = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/v1/organizations/1').respond({id: 1, name: 'some org'});

    $scope.tmp = 1;
    $scope.messages = {};

    element = angular.element("<organization-select organization-id='tmp' messages='messages'></organization-select>");

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
    isolatedScope.$digest();
  }));

  it('sets the organizationId correctly', function() {
    expect(isolatedScope.organizationId).toEqual(1);
  });

  describe('#buttonDisabled', function() {
    it('returns true when the current users org is selected', function() {
      expect(isolatedScope.buttonDisabled({id: 1})).toEqual(true);
    });  

    it('returns false when the org is not current users', function() {
      expect(isolatedScope.buttonDisabled({id: 2})).toEqual(false);
    });
  });

  describe('#performAction', function(){
    it('calls createOrganization when new org', function() {
      spyOn(isolatedScope, 'createOrganization');
      isolatedScope.performAction({ name: 'test' });

      expect(isolatedScope.createOrganization).toHaveBeenCalledWith({name: 'test'});
    });

    it('calls updateUserOrganization when existing org', function(){
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

  });

  describe('#buttonText', function() {
    it('returns save when organization is empty', function(){
      expect(isolatedScope.buttonText({})).toEqual('Save');
    });

    it('returns create organization when a new org is selected', function(){
      expect(isolatedScope.buttonText({name: 'test'})).toEqual('Create Organization');
    });

    it('returns selected when the current users org is selected', function(){
      expect(isolatedScope.buttonText({id: 1, name: 'test'})).toEqual('Selected');
    });

    it('returns select org when an existing org is selected', function(){
      expect(isolatedScope.buttonText({id: 2, name: 'other'})).toEqual('Select other');
    });
  });



});
