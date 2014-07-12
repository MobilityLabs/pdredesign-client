PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('logout', {
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


