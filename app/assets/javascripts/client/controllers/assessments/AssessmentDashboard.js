PDRClient.controller('AssessmentDashboardCtrl', ['$scope', '$timeout', 'SessionService', 'Assessment', '$stateParams', 'Participant',
    function($scope, $timeout, SessionService, Assessment, $stateParams, Participant) {
      $scope.id = $stateParams.id;
      $scope.nonDistrictParticipants = Participant.all({assessment_id: $scope.id})

      $scope.currentUser = SessionService.getCurrentUser();
      Assessment
        .get({id: $scope.id})
        .$promise
        .then(function(data){
          $scope.assessment = data;
          var averages = [];
          var labels   = [];

          var shortnames = {
            "Teacher Engagement": "TE",
            "Delivery Infrastructure": "DI",
            "High Quality Content and Tools": "HQ",
            "PD Process": "PP",
            "Supportive Policies": "SP",
            "Leadership Capacity": "LC",
            "Data Infrastructure": "DTI",
            "Resource Optimization": "RO"
          };

          angular.forEach(data.averages, function(value, key) {
            labels.push(shortnames[key]);
            averages.push(value);
          });

          $scope.createChart(labels, averages);
        });

      $scope.createChart = function(labels, averages){
        var data = {
          labels: labels,
          datasets: [
            {
              fillColor: "#f9e8ea",
              strokeColor: "#ecb0b5",
              pointColor: "#ecb0b5",
              pointStrokeColor: "#ecb0b5",
              data: [2,2,2,2,2,2,2,2]
            },
            {
              fillColor: "transparent",
              strokeColor: "#5e8e9e",
              pointColor: "#5e8e9e",
              pointStrokeColor: "#5e8e9e",
              data: averages
            }
          ]
        };

        options = {
          scaleOverlay : true,
          scaleOverride : true,
          scaleSteps : 4,
          scaleStepWidth : 1,
          scaleStartValue : 0,
          scaleShowLabels : true,
          scaleFontFamily : "'Yanone Kaffeesatz'",
          scaleFontSize : 12,
          scaleFontStyle : "normal",
          scaleFontColor : "#7a7e7f",
          scaleShowLabelBackdrop : false,
          pointLabelFontFamily : "'Yanone Kaffeesatz'",
          pointLabelFontStyle : "normal",
          pointLabelFontSize : 12,
          pointLabelFontColor : "#7a7e7f",
        };

        var ctx = document.getElementById("assessment_radar_graph").getContext('2d');
        var chart = new Chart(ctx).Radar(data, options);
      };

      $scope.messageTitle = function(category) {
        switch(category) {
          case 'welcome':
            return 'Welcome Invite';
          case 'reminder':
            return 'Individual Assessment Reminder';
          default:
            return 'General Message';
        }
      }

      $scope.messageIcon = function(category) {
        switch(category) {
          case 'welcome':
            return 'fa-envelope-o';
          case 'reminder':
            return 'fa-clock-o';
          default:
            return 'fa-envelope-o';
        }
      }

      $scope.statusMessageIcon = function(status) {
        switch(status) {
          case 'invited':
            return 'fa-envelope-o';
          case 'completed':
            return 'fa-check';
          case 'in_progress':
            return 'fa-spinner';
          default:
            return 'fa-envelope-o';
        }
      }

    }
]);
