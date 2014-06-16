describe('Directive: consensus', function() {
  var scope;
  var element;
  var compile;
  var score1 = {}

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $compile) {
    scope   = $rootScope.$new();
    element = angular.element('<consensus></consensus>');
    $compile(element)(scope);
    scope.$digest();
  }));


  it('isConsensus will be true by default ', inject(
    function($rootScope, $compile) {
      expect(scope.$$childTail.isConsensus).toEqual(true)
  }));

  it('saveEvidence will set score.editMode to true', inject(
    function($rootScope, $compile) {
      score1.editMode = null
      scope.$$childTail.saveEvidence(score1)
      expect(score1.editMode).toEqual(true)

  }));

  it('editAnswer will set score.editMode to false', inject(
    function($rootScope, $compile) {
      score1.editMode = null
      scope.$$childTail.editAnswer(score1)
      expect(score1.editMode).toEqual(false)
  }));

});
