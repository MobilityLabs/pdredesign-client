describe('Directive: districtFilter', function() {
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

    element = angular.element("<district-filter> </district-filter>");
    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  describe('#districts', function(){
    it('returns all unique districts', function(){
      assessments = [
        {district_name: 'first'},
        {district_name: 'first'},
        {district_name: 'second'},
        {district_name: 'second'}
      ];

      districts = isolatedScope.districts(assessments);
      expect(districts).toEqual(['first', 'second'])

    });
  });


});
