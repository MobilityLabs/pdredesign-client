PDRClient.directive('faqs', [
  '$timeout',
  'FAQ',
  '$location',
  function($timeout, FAQ, $location) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'client/views/directives/faqs.html',
    link: function(scope, elm, attrs) {
      scope.preSelectedUrl = $location.url();
      scope.categories = [];

      scope.urlIncludesString = function(string) {
        return scope.preSelectedUrl.indexOf(string) != -1;
      };

      scope.setSelectedRole = function(object) {
        return scope.selectedRole = object;
      };

      scope.setSelectedTopic = function(object) {
        return scope.selectedTopic = object;
      };

      scope.checkSelectedRole = function() {
        switch(true) {
          case scope.urlIncludesString('partner'):
            return scope.setSelectedRole('partner');
          case scope.urlIncludesString('facilitator'):
            return scope.setSelectedRole('facilitator');
          case scope.urlIncludesString('all'):
            return scope.setSelectedRole('all');
          default:
            return false;
        }
      };

      scope.checkSelectedTopic = function() {
        if(scope.urlIncludesString('Readiness'))
          return scope.setSelectedTopic('Readiness Assessment');
        if(scope.urlIncludesString('general'))
          return scope.setSelectedTopic('general');
      };

      scope.setOptionFromUrl = function() {
        if(scope.preSelectedUrl.length < 7) return;
        scope.checkSelectedRole();
        scope.checkSelectedTopic();
      };

      scope.updateFAQs = function() {
        return FAQ.query(function(data) {
          return scope.categories = data;
        }).$promise;
      };

      scope.toggleQuestion = function(target) {
        return target.visible = !target.visible;
      };

      scope.uniq_faq_property = function(target, field) {
        var uniq = [];
        angular.forEach(target, function(category){
          angular.forEach(category.questions, function(question){
            uniq.push(question[field]);
          });
        });

        return _.uniq(_.flatten(uniq));
      };

      scope.topics = function() {
        return scope.uniq_faq_property(scope.categories, 'topic');
      };

      scope.roles = function() {
        return scope.uniq_faq_property(scope.categories, 'role');
      };

      scope.setOptionFromUrl();

      $timeout(function() {
        scope.updateFAQs();
      });
    },
  }
}
]);

PDRClient.filter('propertyFilter', function($location) {
  return function(items, property, value) {
    var filtered = [];
    angular.forEach(items, function(item) {
      if(!value || item[property]== value) filtered.push(item);
    });

    $location.search(property, value);

    return filtered;
  };
});
