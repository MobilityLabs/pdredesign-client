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

      scope.preSelectedUrl = $location.url().replace('/faqs', '');
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

      scope.setOptionFromUrl = function() {
        if(scope.preSelectedUrl.length < 1) return;

        if(scope.urlIncludesString('partner'))
          return scope.setSelectedRole('partner');
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
