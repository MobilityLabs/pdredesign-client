describe('Directive: permissionFilter', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $timeout,
      $q,
      $httpBackend;

      var permissionTypes =["Facilitator", "Participant"];

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $q       = $injector.get('$q');
    $timeout = $injector.get('$timeout');

    element = angular.element("<permission-filter types='1'></permission-filter>");
    $compile(element)($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();
  }));

  describe('#permissions', function() {
    it('types is passed types', function(){
      expect(isolatedScope.types).toEqual(1);
    });
  });


});
