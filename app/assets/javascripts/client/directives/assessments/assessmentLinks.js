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
        controller: ['$scope',
          '$modal',
          '$rootScope',
          '$location',
          '$timeout',
          '$state',
          'AccessRequest',
          'SessionService',
          function($scope, $modal, $rootScope, $location, $timeout, $state, AccessRequest, SessionService) {
            $scope.linkIcon = function(type){
              icons = {
                  "response": "check",
                  "request_access": "eye",
                  "pending": "spinner",
                  "dashboard": "dashboard",
                  "consensus": "group",
                  "new_consensus": "group",
                  "edit_report": "group",
                  "show_report": "group",
                  "show_response": "group",
                  "none": "group",
                  "finish": "pencil",
                  "messages": "envelope",
                  "report": "file-text-o",
              }
              return icons[type];
            };

            $scope.createConsensusModal = function() {
              $scope.modal = $modal.open({
                templateUrl: 'client/views/modals/create_consensus.html',
                scope: $scope
              });
            };

            $scope.requestAccess = function() {
              var templateUrl = 'client/views/modals/request_access.html'; 
              if(SessionService.isNetworkPartner())
                templateUrl = 'client/views/modals/request_access_partner.html'; 
                
              $scope.modal = $modal.open({
                templateUrl: templateUrl,
                scope: $scope
              });
            };

            $scope.close = function() {
              $scope.modal.dismiss('cancel');
            }

            $scope.createConsensusLocation = function() {
              $scope.modal.dismiss('cancel');
              $location.url($scope.assessmentLink('new_consensus', true));
            };

            $scope.submitAccessRequest = function(roles) {
              AccessRequest
                .save({assessment_id: $scope.id}, {roles: [roles]})
                .$promise
                .then(function() {
                  $scope.modal.dismiss('cancel');
                  $state.go($state.$current, null, { reload: true });
                });
            };

            $scope.gotoLocation   = function(location) {
              if(!location) return;

              if(location.match(/\/assessments\/.*\/consensus$/)) 
                $scope.createConsensusModal();
              else if(location == 'request_access')
                $scope.requestAccess(); 
              else
                $location.url(location);
            };

            $scope.assessmentLink = function(type, active) {
              if(typeof type === 'undefined' || active == "false")
                return false;

              routes = {
                "request_access": "request_access",
                "new_consensus": "/assessments/" + $scope.id + "/consensus",
                "dashboard":     "/assessments/" + $scope.id + "/dashboard",
                "consensus":     "/assessments/" + $scope.id + "/consensus",
                "finish":        "/assessments/" + $scope.id + "/assign",
                "report":        "/assessments/" + $scope.id + "/report",
                "edit_report":   "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                "show_report":   "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                "messages":      "/assessments/" + $scope.id + "/dashboard",
                "consensus":     "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                "show_response": "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
              };

              return routes[type];
            };

            $scope.linkActive = function(link){
              if(link == "true")
                return "active";
              else
                return "disabled";
            };

        }],

      }
    }
]);
