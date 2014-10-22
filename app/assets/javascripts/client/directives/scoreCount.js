PDRClient.directive('scoreCount', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        transclusion: true,
        scope: {
          answer: '=',
          question: '=',
          isReadOnly: '@',
          participantCount: '@',
          answerCount: '@',
        },
        templateUrl: 'client/views/shared/responses/score_count.html',

      }
    }
]);
