describe('Controller: AssessmentsCtrl', function() {
  var subject, scope, $httpBackend;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $rootScope, $injector) {
    $httpBackend = $injector.get('$httpBackend');

    scope    = $rootScope.$new();
    subject  = $controller('AssessmentsCtrl', {
      $scope: scope
    });

  }));

  function mock_assessments(data) {
    $httpBackend
      .expectGET('/v1/assessments')
      .respond(data);
  }

  it('resource loads query', inject(
    function($rootScope) {
      // Json backend tested.

      mock_assessments([{first_name: 'test'},
                        {first_name: 'test2'}]);
      $httpBackend.flush();


      expect(scope.assessments.length).toEqual(2);
  }));

});

