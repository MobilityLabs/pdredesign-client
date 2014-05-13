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
          scope.id = attrs.id;
          scope.role = attrs.role;
        },
        controller: ['$scope', '$rootScope', '$location', '$timeout',
          function($scope, $rootScope, $location, $timeout) {
            $scope.linkIcon = function(type){
              icons = {
                  "dashboard": "dashboard",
                  "consensus": "group",
                  "edit_report": "group",
                  "show_report": "group",
                  "finish": "pencil",
                  "report": "file-text-o",
              }
              return icons[type];
            };

            $scope.assessmentLink = function(type, role, active) {
              if(typeof type === 'undefined' || typeof role === 'undefined' || active == "false")
                return "#";

              routes = {
                "facilitator": {
                  "dashboard": "#/assessments/" + $scope.id + "/dashboard",
                  "consensus": "group",
                  "edit_report": "group",
                  "show_report": "/reports",
                  "finish": "#/assessments/" + $scope.id + "/assign",
                  "report": "file-text-o",
                },
                "member": {
                  "consensus": "group",
                  "edit_report": "group",
                  "show_report": "group",
                  "finish": "pencil",
                  "report": "file-text-o",
                }
              }

              return routes[role][type];
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
