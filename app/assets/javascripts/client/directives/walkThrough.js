PDRClient.directive('walkThrough', [
  '$modal',
  '$timeout',
  'WalkThrough', function ($modal, $timeout, WalkThrough) {
  return {
    restrict:'E',
    templateUrl: 'client/views/directives/walk_through.html',
    replace: true,
    scope: {
      id: '@',
      linkTitle: '@'
    },
    link: function(scope, elm, attrs) {

      scope.walkThrough = {};

      attrs.$observe('id', function(id) {
        scope.id = id;
      });

      scope.updateWalkThrough = function(id) {
        WalkThrough.get({id: id}) 
          .$promise
          .then(function(walk_through){
            scope.walkThrough = walk_through;
          });
      };

      scope.close = function() {
        scope.modal.dismiss('cancel');
      };

      scope.showModal = function() {
        scope.modal = $modal.open({
          templateUrl: 'client/views/modals/walk_through.html',
          scope: scope,
          size: 'lg',
        });

        scope.modal.opened.then(function(){
          scope.updateWalkThrough(scope.id);
        });
      };
    }
  };
}]);
