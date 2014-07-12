PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('consensus_show', {
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
   });

  }
]);


