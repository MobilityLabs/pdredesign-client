PDRClient = angular.module("PDRClient", [
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'templates',
  'angular-redactor',
  'angularMoment',
  'ui.router',
  'ui.bootstrap',
  'ui.select2']);

PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('home', {
      url: '/',
      views: {
        '': {
          controller: 'HomeCtrl',
          templateUrl: 'client/views/shared/include_template.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
       }
      }
    })
    .state('logout', {
      url: '/logout',
      controller: ['$rootScope', '$scope', 'SessionService', '$location',
        function($rootScope, $scope, SessionService, $location) {
          SessionService
            .logout()
            .then(function() {
              $rootScope.$broadcast('session_updated');
              $location.path('/');
            });
      }],
    })
    .state('login', {
      url: '/login',
      views: {
        '': {
          controller: 'LoginCtrl',
          templateUrl: 'client/views/login/login.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('assessments', {
      url: '/assessments',
      views: {
        '': {
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
    .state('response_edit', {
      url: '/assessments/:assessment_id/responses/:response_id',
      views: {
        '': {
          controller: 'ResponseCtrl',
          templateUrl: 'client/views/responses/edit.html'
        },
        'sidebar': {
          controller: 'SidebarResponseCardCtrl',
          templateUrl: 'client/views/sidebar/response_card.html'
        }
      }
   })
   .state('signup', {
      url: '/signup',
      views: {
        '': {
          controller: 'SignupCtrl',
          templateUrl: 'client/views/signup/member.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
   .state('signup_facilitator', {
      url: '/signup/facilitator',
      views: {
        '': {
          controller: 'SignupCtrl',
          templateUrl: 'client/views/signup/facilitator.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })

    .state('settings', {
      url: '/settings',
      views: {
        '': {
          controller: 'SettingsCtrl',
          templateUrl: 'client/views/settings/settings.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
        }
      }
    });

  }
]);
