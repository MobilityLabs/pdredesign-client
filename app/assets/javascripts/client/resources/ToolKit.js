PDRClient.factory('ToolKit', ['$resource', function($resource) {
    return $resource('/v1/toolkits');
}]);
