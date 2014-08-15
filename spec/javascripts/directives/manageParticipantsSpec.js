describe('Directive: manageParticipants', function() {
  var $scope,
      $compile,
      $timeout,
      $modal,
      element,
      Participant;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $rootScope) {
    $compile = $injector.get('$compile');
    $q       = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    $modal   = $injector.get('$modal');
    $scope   = $rootScope.$new();

    Participant = $injector.get('Participant');
    element     = angular.element('<manage-participants data-assessment-id=1></manage-participants>');
    timeout     = $timeout;


    $compile(element)($scope);

    $scope.$digest();
    $scope = $scope.$$childTail;
  }));

  it('shows the right modal when showing', function(){
    spyOn($modal, 'open')
      .and.callFake(function(params){
        expect(params.templateUrl)
          .toEqual('client/views/modals/manage_participants.html');

        expect(params.size).toEqual('lg');
      });

    $scope.showAddParticipants();
    expect($modal.open).toHaveBeenCalled();
  });

  it('calls update with the correct assessment id', function(){
    spyOn(Participant, 'all');

    $scope.updateParticipants(); 

    expect(Participant.all).toHaveBeenCalledWith({assessment_id: '1'});
  });

  it('saves a participant when adding', function() {
      spyOn(Participant, 'save').and.callFake(function(params, user) {
        var deferred = q.defer();
        deferred.resolve({});
        expect(params).toEqual({assessment_id: '1'});
        expect(user).toEqual({user_id: 8});
        return {$promise: deferred.promise};
      });

    $scope.addParticipant({id: 8}); 
    expect(Participant.save).toHaveBeenCalled();
  });

});
