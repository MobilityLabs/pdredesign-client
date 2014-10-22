PDRClient.directive('scoreCount', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          answer: '=',
          question: '=',
          isReadOnly: '@',
          scores: '=',
          participantCount: '@',
          answerCount: '@',
        },
        templateUrl: 'client/views/shared/responses/score_count.html',
        controller: [
          '$scope',
          '$rootScope',
          '$location',
          '$state',
          'User',
          'SessionService',
          function($scope, $rootScope, $location, $state, User, SessionService) {
          }],
      }
    }
]);
