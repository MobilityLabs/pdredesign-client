PDRClient.factory('Assessment', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:id'));
}]);
