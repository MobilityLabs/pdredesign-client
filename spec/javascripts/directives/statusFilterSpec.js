describe('Directive: statusFilter', function() {
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

    element = angular.element("<status-filter> </status-filter>");
    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  describe('#status', function(){
    it('returns all unique statuses', function(){
      assessments = [
        {status: 'draft'},
        {status: 'consensus'},
        {status: 'draft'},
        {status: 'consensus'}
      ];

      statuses = isolatedScope.statuses(assessments);
      expect(statuses).toEqual(['draft', 'consensus'])

    });
  });


});
