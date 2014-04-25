PDRClient.service('SessionService', 
  ['UrlService', '$http', function(UrlService, $http) {
  var userIsAuthenticated   = false;
  var service = this;
  var user = null;

  this.getUserAuthenticated = function() {
    return userIsAuthenticated;
  }

  this.getCurrentUser = function() {
    return user;
  }
  
  this.authenticate = function(username, password) {
    $http({ 
      method: 'POST', 
      url:     UrlService.url('session') ,
      data: {username: username, password: password}
    }).success(function(data, status, headers) {
      user = data;
      userIsAuthenticated = true;
    })  }

  this.setUserTemplate = function(scope, loggedInTemplate, loggedOutTemplate) {
    if(service.getUserAuthenticated()) {
      scope.template = loggedInTemplate;
    } else {
      scope.template = loggedOutTemplate;
    }
  }

}]);
