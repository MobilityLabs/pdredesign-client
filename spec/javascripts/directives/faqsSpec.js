describe('Directive: faqs', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $timeout,
      $httpBackend,
      $location,
      $filter;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    $filter = $injector.get('$filter');
    $location.url("/faq");
    element = angular.element("<faqs></faqs>");
    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  it('it gets FAQs from the backend endpoint', function(){
    $httpBackend.expectGET('/v1/faqs').respond([{expected: true}]);
    $timeout.flush();
  });

  it('#updateFAQs calls filterPlaceHolders on success', function(){
    spyOn(isolatedScope, 'filterPlaceHolders');
    $httpBackend.expectGET('/v1/faqs').respond();
    isolatedScope.updateFAQs();
    $httpBackend.flush();
    expect(isolatedScope.filterPlaceHolders).toHaveBeenCalled();
  });

  it('#toggleQuestion toggles a targest visibility', function() {
    var target = { visible: false };
    isolatedScope.toggleQuestion(target);
    expect(target.visible).toEqual(true);
  });

  it('#uniq_faq_property returns a uniq property from categories', function(){
    var categories = [
      {questions: [{role: 'first'}, {role: 'second'}, {role: 'first'}]},
      {questions: [{role: 'first'}, {role: 'second'}, {role: 'third'}]},
    ];
    expect(isolatedScope.uniq_faq_property(categories, 'role'))
        .toEqual(['first', 'second', 'third']);
  });

  it('#preSelectedUrl is set by $location.url', function(){
    expect(isolatedScope.preSelectedUrl)
      .toEqual($location.url());
  });

  describe('#urlIncludesString', function(){
    it('returns false when string is not present in preSelectedUrl', function(){
      expect(isolatedScope.urlIncludesString('hello'))
        .toEqual(false);
    });

    it('returns true when string is present in preSelectedUrl', function(){
      expect(isolatedScope.urlIncludesString('faq'))
        .toEqual(true);
    });
  });

  describe('#setSelectedRole', function(){
    it('sets selectedRole to string param', function() {
      expect(isolatedScope.selectedRole)
        .not.toEqual('partner');
      isolatedScope.setSelectedRole('partner');
      expect(isolatedScope.selectedRole)
        .toEqual('partner');
    });
  });

  describe('#setSelectedTopic', function(){
    it('sets selectedTopic to string param', function() {
      expect(isolatedScope.selectedTopic)
        .not.toEqual('general');
      isolatedScope.setSelectedTopic('general');
      expect(isolatedScope.selectedTopic)
        .toEqual('general');
    });
  });

  describe('#checkSelectedRole', function(){
    it('returns partner if present in preSelectedUrl', function() {
      isolatedScope.preSelectedUrl = "/faqs?partner";
      isolatedScope.$digest();
      expect(isolatedScope.checkSelectedRole()).toEqual('partner');
    });

    it('returns false at the proper time', function() {
      isolatedScope.preSelectedUrl = "/faqs?paner";
      isolatedScope.$digest();
      expect(isolatedScope.checkSelectedRole()).toEqual(false);
    });

    describe('preSelectedUrl has partner', function(){
      beforeEach(function(){
        isolatedScope.preSelectedUrl = "/faqs?partner";
        spyOn(isolatedScope, 'setSelectedRole');
        spyOn(isolatedScope, 'setSelectedTopic');
        isolatedScope.checkSelectedRole();
      });

      it('calls setSelectedRole', function() {
        expect(isolatedScope.setSelectedRole)
          .toHaveBeenCalled();
      });

      it('does not call checkSelectedTopic', function() {
        expect(isolatedScope.setSelectedTopic)
          .not.toHaveBeenCalled();
      });
    });
  });

  describe('checkSelectedTopic', function(){
    beforeEach(function(){
      isolatedScope.preSelectedUrl = "/faqs?partner?general";
      spyOn(isolatedScope, 'setSelectedTopic');
      isolatedScope.checkSelectedTopic();
    });

    it('calls checkSelectedTopic', function() {
      expect(isolatedScope.setSelectedTopic)
        .toHaveBeenCalled();
    });
  });

  describe('#setOptionFromUrl', function(){
    describe('#preSelectedUrl.length is greater then 7', function(){
      beforeEach(function(){
        isolatedScope.preSelectedUrl = "/faqs?hellohellohello";
        spyOn(isolatedScope, 'checkSelectedRole')
        spyOn(isolatedScope, 'checkSelectedTopic')
      });

      it('calls function checkSelectedRole', function() {
        isolatedScope.setOptionFromUrl();
        expect(isolatedScope.checkSelectedRole)
          .toHaveBeenCalled();
      });

      it('calls function checkSelectedTopic', function() {
        isolatedScope.setOptionFromUrl();
        expect(isolatedScope.checkSelectedTopic)
          .toHaveBeenCalled();
      });
    });

    it('does not call function checkSelectedRole if preSelectedUrl.length is less then 7', function() {
      spyOn(isolatedScope, 'checkSelectedRole');
      isolatedScope.preSelectedUrl = "/faqs";
      isolatedScope.setOptionFromUrl();
      expect(isolatedScope.checkSelectedRole)
        .not.toHaveBeenCalled();
    });
  });

  it('#propertyFilter calls $location.search', function(){
    spyOn($location, 'search');
    $filter('propertyFilter')('role', 'options');
    expect($location.search).toHaveBeenCalled();
  });

});
