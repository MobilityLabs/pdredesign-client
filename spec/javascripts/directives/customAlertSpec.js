describe('Directive: customalert', function() {
  var $scope,
      $compile;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new();
    $compile = $injector.get('$compile');

  }));

  function compileElement(template) {
    element = angular.element(template);
    $compile(element)($scope);
    $scope.$digest();
    return element;
  }

  it('is a success alert ', function() {
    var element = compileElement('<customalert data-message="HeLLO JELOO" data-type="success"></customalert>');
    expect(element.find('div').attr('class')).toEqual('customalert success')
  });

  it('is an error alert', function() {
    var element = compileElement('<customalert data-message="HeLLO JELOO" data-type="error"></customalert>');
    expect(element.find('div').attr('class')).toEqual('customalert error')
  });

});
