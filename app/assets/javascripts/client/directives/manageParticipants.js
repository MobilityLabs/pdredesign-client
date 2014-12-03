PDRClient.directive('manageParticipants', ['SessionService', 'Assessment', '$timeout', '$modal',
    function(SessionService, Assessment, $timeout, $modal) {
      return {
        restrict: 'E',
        replace: false,
        templateUrl: 'client/views/directives/manage_participants.html',
        scope: {
          'assessmentId': '@',
          'sendInvite': '@'
        },
        controller: ['$scope', '$modal', 'Participant', function($scope, $modal, Participant) {

          $scope.participants = [];

          $scope.showAddParticipants = function() {
            $scope.updateParticipants();

            $scope.modalInstance = $modal.open({
              templateUrl: 'client/views/modals/manage_participants.html',
              scope: $scope,
              size: 'lg'
            });
          };

          $scope.hideModal = function() {
            $scope.modalInstance.dismiss('cancel');
          };

          $scope.updateParticipants = function() {
            $scope.participants  = Participant.all({assessment_id: $scope.assessmentId});
          };

          $scope.shouldSendInvite = function() {
            return $scope.sendInvite == "true" || $scope.sendInvite == true;
          };

          $scope.addParticipant = function(user) {
            Participant
              .save({assessment_id: $scope.assessmentId}, {user_id: user.id, send_invite: $scope.shouldSendInvite()})
              .$promise
              .then(function() {
                $scope.updateParticipants();
                $scope.$emit('update_participants');
              });
          };

        }],
     };
}]);
