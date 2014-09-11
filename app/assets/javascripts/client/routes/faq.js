PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('faq', {
      url: '/faq',
      views: {
        '': {
          controller: 'FaqCtrl',
          templateUrl: 'client/views/faq/faq.html'
        },
      }
    })
  }
]);
