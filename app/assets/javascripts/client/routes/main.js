PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

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
    });

    $urlRouterProvider.otherwise("/");
  }
]);


