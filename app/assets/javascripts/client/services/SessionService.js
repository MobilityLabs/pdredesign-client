PDRClient.factory('SessionService', function() {
  var userIsAuthenticated   = false;
  var service = {};
  service.getUserAuthenticated = function() {
    return userIsAuthenticated;
  };

  return service;
});
