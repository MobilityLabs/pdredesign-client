PDRClient.directive('organizationSelect', [
  '$q',
  '$timeout',
  'SessionService',
  'UrlService',
  'Organization',
  'User',
  'OrganizationHelper',
  function($q, $timeout, SessionService, UrlService, Organization, User, OrganizationHelper) {
      return {
        restrict: 'E',
        replace: false,
        scope: {
          organizationId: '=',
          messages: '=',
        },
        templateUrl: 'client/views/directives/organization_select.html',
        link: function(scope, elm, attrs) {
          scope.organization = {};
          scope.firstLoad = true;

          scope.updateUserOrganization = function(organization) {
             scope.organizationId = organization.id;
             User
               .save({organization_ids: organization.id || null})
               .$promise
               .then(function() {
                scope.messages = {type: 'success', msg: 'Profile updated'};
               });
          };

          scope.createOrganization = function(organization) {
            Organization
              .create({name: organization.name})
              .$promise.then(function(result) {
                scope.updateOption(result)
                scope.updateUserOrganization(result);
              });
          };

          scope.updateOption  = function(result) {
            var selectize = scope.selectizeElement();
            selectize.clear();
            selectize.clearOptions();
            selectize.addOption({
              name: result.name,
              id: result.id });
            scope.selectizeElement().setValue(result.name);
          };

          scope.performAction = function(organization) {
            // Prevents success alert when page load
            if(scope.firstLoad)
              return scope.firstLoad = false;

            if(organization.id == null && organization.name)
              scope.createOrganization(organization);
            else
              scope.updateUserOrganization(organization);
          };

          $timeout(function() {
            scope.selectize = $(elm).find('#organization').selectize({
                valueField:  'name',
                labelField:  'name',
                searchField: 'name',
                maxItems:     1,
                onItemAdd: function(value) {
                  var item = scope.selectizeElement().options[value];
                  scope.performAction(item);
                },
                onDelete: function(value){
                  scope.organization.id = null;
                  scope.updateUserOrganization(scope.organization);
                },
                create: function(input, callback) {
                  callback(scope.performAction({name: input}));
                },
                render: {
                  item: function(item, escape) {
                    return '<div>' + item.name + '</div>';
                  }
                },
                load: function(query, callback) {
                  if (!query.length) return callback();
                    return OrganizationHelper.searchOrganization(query, callback);
                }
            });
            scope.updateOrganizationData(scope.organizationId);
          });

          scope.selectizeElement = function() {
            return scope.selectize[0] && scope.selectize[0].selectize;
          };

          scope.updateOrganizationData = function(value) {
            if(!value)
              return scope.firstLoad = false;

            Organization
              .get({id: value})
              .$promise
              .then(function(org) {
                scope.selectizeElement().addOption({
                  name: org.name, id: org.id
                });
                scope.selectizeElement().setValue(org.name);
              });
          };

          scope.$watch('organizationId', function(value, _oldValue) {
            if(!scope.selectize || !scope.organization) return;
            scope.updateOrganizationData(value);
          });

        },
     }
}]);
