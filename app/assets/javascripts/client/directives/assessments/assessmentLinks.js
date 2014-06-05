PDRClient.directive('assessmentLinks', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/assessment_index_links.html',
        link: function(scope, elm, attrs) {
          scope.active = attrs.active;
          scope.title  = attrs.title;
          scope.type   = attrs.type;
          scope.role   = attrs.role;
          scope.id     = attrs.id;
          scope.consensusId = attrs.consensusId;
        },
        controller: ['$scope', '$rootScope', '$location', '$timeout',
          function($scope, $rootScope, $location, $timeout) {
            $scope.linkIcon = function(type){
              icons = {
                  "dashboard": "dashboard",
                  "consensus": "group",
                  "new_consensus": "group",
                  "edit_report": "group",
                  "show_report": "group",
                  "show_response": "group",
                  "none": "group",
                  "finish": "pencil",
                  "messages": "messages",
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
                  "new_consensus": "#/assessments/" + $scope.id + "/consensus",
                  "consensus": "#/assessments/" + $scope.id + "/consensus",
                  "finish": "#/assessments/" + $scope.id + "/assign",
                  "report": "#/assessments/" + $scope.id + "/report",
                  "edit_report": "#/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                  "show_report": "#/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                },
                "member": {
                  "messages": "#/assessments/" + $scope.id + "/dashboard",
                  "consensus": "#/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                  "show_response": "#/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
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
