PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('assessments', {
      url: '/assessments',
      views: {
        '': {
          resolve: {
            assessments: ['Assessment', function(Assessment) { return Assessment.query().$promise;}]
          },
          controller: 'AssessmentsCtrl',
          templateUrl: 'client/views/assessments/index.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
        }
      }
   })
   .state('assessment_dashboard', {
     url: '/assessments/:id/dashboard',
     views: {
       '': {
         controller: 'AssessmentDashboardCtrl',
         templateUrl: 'client/views/assessments/dashboard.html'
       },
       'sidebar': {
         controller: 'SidebarCtrl',
         templateUrl: 'client/views/sidebar/assessment_dashboard.html'
       }
     }
   })
   .state('assessment_report', {
     url: '/assessments/:id/report',
     views: {
       '': {
         controller: 'AssessmentReportCtrl',
         templateUrl: 'client/views/assessments/report.html'
       },
       'sidebar': {
         controller: 'SidebarCtrl',
         templateUrl: 'client/views/sidebar/assessment_dashboard.html'
       }
     }
   })
   .state('assessment_assign', {
     url: '/assessments/:id/assign',
     views: {
       '': {
         controller: 'AssessmentAssignCtrl',
         templateUrl: 'client/views/assessments/assign/assign.html'
       }
     }
   })
   .state('assessment_edit', {
     url: '/assessments/:id/edit',
     views: {
       '': {
         controller: 'AssessmentEditCtrl',
         templateUrl: 'client/views/assessments/edit.html'
       },
       'sidebar': {
         controller: 'SidebarCtrl',
         templateUrl: 'client/views/sidebar/sidebar_generic.html'
       }
     }
   })

  }
]);


