describe('Controller: DistrictMessage', function() {
  var subject,
      scopeget,
      httpBackend,
      timeout,
      DistrictMessage;

  var message = {"name": "some name",
    "address": "123 Main st",
    "sender_name": "educator",
    "sender_email": "something@something.com"}
  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller) {
      q                  = $injector.get('$q');
      scope              = $injector.get('$rootScope').$new();
      httpBackend        = $injector.get('$httpBackend');
      DistrictMessage    = $injector.get('DistrictMessage');

      subject  = $controller('DistrictMessageCtrl', {
        $scope: scope
      });
  }));

  it('can create a DistrictMessage', function() {
      spyOn(DistrictMessage, 'save').and.callFake(function(message) {
        var deferred = q.defer();
          deferred.resolve({});
        return {$promise: deferred.promise};
      });


      scope.sendMessage(message);
      scope.$apply();
      expect(scope.success).toEqual("Thank you!");
  });


  it('fails gracefully', function() {
      spyOn(DistrictMessage, 'save').and.callFake(function(message) {
        var deferred = q.defer();
        deferred.reject({
          "data": {
            "errors": ["some error"]
          }
        });

        return {$promise: deferred.promise};
      });


      scope.sendMessage(message);
      scope.$apply();
      expect(scope.errors).toEqual(["some error"]);
  });
});
