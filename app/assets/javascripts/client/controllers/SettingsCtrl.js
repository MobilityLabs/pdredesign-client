PDRClient.controller('SettingsCtrl', ['$scope', '$timeout', 'User', 'SessionService', 'UrlService',
    function($scope, $timeout, User, SessionService, UrlService) {
     
      $scope.user    = {};
      $scope.user    = User.get();
      $scope.errors  = null;
      $scope.success = null;

      $scope.$watch('user', function() {
        if(!$scope.user.districts)
          return;
        $scope.districtId = $scope.user.districts[0].id;
        $scope.districtText= $scope.user.districts[0].text;
      });

      $timeout(function() {
        $('#districts').selectize({
          valueField:  'id',
          labelField:  'text',
          searchField: 'text',
          maxItems:    1,
          create:      false,
          render: {
            option: function(item, escape) {
              return '<div>' + item.text + '</div>';
            }
          },
          load: function(query, callback) {
            if (!query.length) return callback();
            $.ajax({
              url: UrlService.url('districts/search') + '?query=' + encodeURIComponent(query),
              type: 'GET',
              error: function() {
                callback();
              },
              success: function(res) {
                callback(res.results);
              }
            });
          }
        });

      });

      $scope.update = function(editedUser) {
        editedUser["district_ids"] = $scope.selectedDistrict;

        editedUser
          .$save()
          .then(
            function(data) {
              $scope.success    = "Your profile has been updated"
              SessionService.syncUser();
            },
            function(response) {
              $scope.errors  = response.data.errors
            }
          );
      };

    }
]);
