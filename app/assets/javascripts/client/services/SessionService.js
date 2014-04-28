PDRClient.service('SessionService', 
  ['UrlService', '$http', '$location', '$q', 
  function(UrlService, $http, $location, $q) {
    var userIsAuthenticated   = false;
    var service = this;
    var user = null;

    this.getUserAuthenticated = function() {
      return userIsAuthenticated;
    }

    this.getCurrentUser = function() {
      return user;
    }
    
    this.clear = function() {
      user = null;
      userIsAuthenticated = false;
    };

    this.logout = function() {
      var deferred = $q.defer();

      $http({ 
        method: 'DELETE', 
        url:     UrlService.url('users/sign_out') ,
        data: {}
      }).then(function(response) {
        service.clear();
        deferred.resolve(true);
      });
     
      return deferred.promise;
    };

    this.authenticate = function(email, password) {
      var deferred = $q.defer();

      $http({ 
        method: 'POST', 
        url:     UrlService.url('users/sign_in') ,
        data: {email: email, password: password}
      }).then(function(response) {
        user = response.data;
        userIsAuthenticated = true;
        deferred.resolve(user);
      }, function(response){
        service.clear();
        deferred.reject(false);
      });
     
      return deferred.promise;
    }

    this.setUserTemplate = function(scope, loggedInTemplate, loggedOutTemplate) {
      if(service.getUserAuthenticated()) {
        scope.template = loggedInTemplate;
      } else {
        scope.template = loggedOutTemplate;
      }
    }

}]);
