PDRClient.factory('WalkThrough', ['$resource','UrlService',
  function($resource, UrlService) {
    return $resource(UrlService.url('walk_throughs/:id'));
  }
]);
