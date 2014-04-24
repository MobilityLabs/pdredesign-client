PDRClient.factory('SessionService', function() {
  var userIsAuthenticated   = false;
  return {
    getUserAuthenticated: function() {
      return userIsAuthenticated;
    }
  };
});
