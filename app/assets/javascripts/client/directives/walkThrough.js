PDRClient.directive('walkThrough', [
  '$modal',
  '$timeout',
  '$http',
  '$compile',
  '$state',
  'UrlService',
  'WalkThrough', function ($modal, $timeout, $http, $compile, $state, UrlService, WalkThrough) {
  return {
    restrict:'E',
    templateUrl: 'client/views/directives/walk_through.html',
    replace: true,
    scope: {
      id: '@',
      linkTitle: '@',
      autoLaunch: '@',
    },
    link: function(scope, elm, attrs) {
      scope.walkThrough  = {};

      attrs.$observe('id', function(id) {
        scope.id = id;
      });
     
      scope.setActive = function(id) {
        scope.walkThrough.slides[id].active = true;
      };

      scope.isFirstSlide = function(index) {
        return index == 0;
      };

      scope.isLastSlide = function(index) {
        return index+1 == scope.walkThrough.slides.length;
      };

      scope.updateWalkThrough = function(id) {
        WalkThrough.get({id: id}) 
          .$promise
          .then(function(walk_through){
            scope.walkThrough = walk_through;

            if(scope.autoLaunch && !scope.walkThrough.viewed)
              scope.showModal();
          });
      };

      scope.close = function() {
        scope.logWalkThroughView(scope.id);
        scope.modal.dismiss('cancel');
      };

      scope.logWalkThroughView = function(id) {
        $http({
          url: UrlService.url('walk_throughs/' + id + '/viewed'), 
          method: "post",
        });
      };

      scope.showModal = function() {
        scope.modal = $modal.open({
          templateUrl: 'client/views/modals/walk_through.html',
          scope: scope,
          size: 'lg',
        });
      };

      scope.modal.opened.then(function() {
        if(!scope.walkThrough) scope.updateWalkThrough(scope.id);
      });

      if($state.is('assessments'))
        scope.updateWalkThrough(scope.id);
    }
  };
}]);
