PDRClient.service('SessionService',
  ['UrlService', '$http', '$location', '$q',
  function(UrlService, $http, $location, $q) {
    var userIsAuthenticated = false;
    var service = this;
    var user    = null;

    function setCurrentUser(usr) {
      user = usr;
      userIsAuthenticated = true;
      localStorage.setItem('user', user);
    }

    this.softLogin = function() {
      var localUser = localStorage.getItem('user');   
      if(localUser !== null && typeof localUser !== 'undefined')
        setCurrentUser(localUser);
    }
    this.softLogin();

    this.getUserAuthenticated = function() {
      return userIsAuthenticated;
    }

    this.getCurrentUser = function() {
      return user;
    }

    this.clear = function() {
      user = null;
      userIsAuthenticated = false;
      localStorage.clear();
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
        var responseUser = response.data.user;
        setCurrentUser(responseUser);
        deferred.resolve(responseUser);
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
