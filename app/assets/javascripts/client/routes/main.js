PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url: '/',
      views: {
        '': {
          controller: 'HomeCtrl',
          templateUrl: 'client/views/shared/include_template.html'
        }
        //sidebar is homeSidebar.js directive
      }
    });

    $urlRouterProvider.otherwise("/");
  }
]);
