PDRClient.directive('assessmentlinks', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/assessment_index_links.html',
        link: function(scope, elm, attrs) {
          scope.active = attrs.active;
          scope.title = attrs.title;
          scope.type = attrs.type;
        },
        controller: ['$scope', '$rootScope', '$location', '$timeout',
          function($scope, $rootScope, $location, $timeout) {
            $scope.linkIcon = function(type){
              switch (type) {
                case 'dashboard':
                  return  "dashboard";

                case 'consensus':
                case 'edit_report':
                case 'show_report':
                  return "group";

                case 'finish':
                  return "pencil";

                case 'report':
                  return "file-text-o";
                default:
                  return 'group';
              }

            }

            $scope.linkActive = function(link){

                if (link == "true") {
                  return "active";
                }
                else {
                  return "disabled";
                }

            }

        }],

      }
    }
]);
