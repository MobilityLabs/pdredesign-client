PDRClient.factory('Consensus', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/consensus/:id'), null,
      {
        'create': { method: 'POST'},
        'submit': { method: 'PUT'},
      });
}]);
