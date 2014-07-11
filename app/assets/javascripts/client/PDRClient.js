PDRClient = angular.module("PDRClient", [
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'templates',
  'angular-redactor',
  'angularMoment',
  'ui.utils',
  'ui.router',
  'ui.bootstrap']);

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
    .state('reset', {
      url: '/reset',
      views: {
        '': {
          controller: 'ResetPasswordCtrl',
          templateUrl: 'client/views/reset_password/request_reset.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('reset_token', {
      url: '/reset/:token',
      views: {
        '': {
          controller: 'ResetPasswordCtrl',
          templateUrl: 'client/views/reset_password/reset.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('invite', {
      url: '/invitations/:token',
      views: {
        '': {
          controller: 'InvitationCtrl',
          templateUrl: 'client/views/invitation/redeem.html'
        },
        'sidebar': {
          controller: '',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
        }
      }
    })
    .state('assessments', {
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
   .state('response_create', {
     url: '/assessments/:assessment_id/responses',
     views: {
       '': {
         controller: 'ResponseCreateCtrl',
         templateUrl: ''
       }
     }
   })
   .state('consensus_show', {
     url: '/assessments/:assessment_id/consensus/:response_id',
     views: {
       '': {
         controller: 'ConsensusShowCtrl',
         templateUrl: 'client/views/consensus/show.html'
       },
       'sidebar': {
         controller: 'SidebarResponseCardCtrl',
         templateUrl: 'client/views/sidebar/response_card.html'
       }
     }
   })
   .state('consensus_create', {
     url: '/assessments/:assessment_id/consensus',
     views: {
       '': {
         controller: 'ConsensusCreateCtrl',
         templateUrl: 'client/views/consensus/show.html'
       },
       'sidebar': {
         controller: 'SidebarResponseCardCtrl',
         templateUrl: 'client/views/sidebar/sidebar_generic.html'
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
    .state('terms_of_use', {
      url: '/terms-of-use',
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/static/terms_of_use.html'
        },
      }
    })
    .state('privacy', {
      url: '/privacy',
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/static/privacy.html'
        },
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

angular.module("PDRClient").run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state       = $state;
    $rootScope.$stateParams = $stateParams;
});

angular.module("PDRClient").run([
  '$rootScope',
  '$state',
  '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$on('$stateChangeStart', function() {
      $rootScope.$broadcast('start_change');
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      $rootScope.$broadcast('success_change');
    });
}]);
