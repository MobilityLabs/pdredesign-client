PDRClient.factory('User', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('users'),
      {
        actions: {
          'get': { url: UrlService.url('users/edit') }
        }
      });
}]);
