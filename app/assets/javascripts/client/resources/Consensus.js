PDRClient.factory('Consensus', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/consensus/:id'), null,
      {
        'create': { method: 'POST'},
        'submit': { method: 'PUT'},
        'report': { url: UrlService.url('/assessments/:assessment_id/consensus/:id/consensus_report'), action: 'consensus_report' }
      });
}]);
