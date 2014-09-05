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

          scope.buttonText = function(organization) {
            if(!organization.name || organization.name.length == 0)
              return 'Save';

            if(organization.id == null)
              return 'Create Organization';
            else if(organization.id == scope.organizationId)
              return 'Selected';
            return 'Select ' + organization.name;
          };

          scope.buttonDisabled = function(organization) {
            if(scope.organizationId == null)
              return false;
            else if(organization.id == scope.organizationId)
              return true;
            else
              return false;
          };

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
            if(organization.id == null && organization.name)
              scope.createOrganization(organization);
            else
              scope.updateUserOrganization(organization);
          };

          $timeout(function(){
            scope.selectize = $('#organization').selectize({
                valueField:  'name',
                labelField:  'name',
                searchField: 'name',
                maxItems:     1,
                onChange: function(value) {
                  if(!value || value.length == 0) {
                    scope.organization = {};
                    _.defer(function(){ scope.$apply(); });
                    return;
                  }
                  var item = scope.selectizeElement().options[value];
                  scope.organization.id   = item.new ? null : item.id;
                  scope.organization.name = item.name;

                  _.defer(function(){ scope.$apply(); });
                },
                create: function(input, callback) {
                  callback({new: true, name: input});
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
