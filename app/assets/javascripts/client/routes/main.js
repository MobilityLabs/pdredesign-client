PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url: '/home',
      authenticate: true,
      views: {
        '': {
          controller: 'HomeCtrl',
          templateUrl: 'client/views/home/home_user.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
       }
      }
    });

    $stateProvider.state('root', {
      url: '/',
      showFullWidth: true,
      views: {
        'full-width': {
          controller: 'HomeCtrl',
          templateUrl: 'client/views/home/home_anon.html'
        },
      }
    });

    $urlRouterProvider.otherwise("/");
  }
]);


