PDRClient.controller('HomeCtrl', ['$scope','ToolKit', 'SessionService', '$timeout',
    function($scope, ToolKit, SessionService, $timeout) {
      $scope.toolKits  = [];
      $scope.user = SessionService.getCurrentUser();
      $timeout(function() {
        $scope.updateToolKits();
      });

      $scope.updateToolKits = function() {
        ToolKit.query({}, function(t) {
          $scope.toolKits = t;
          $scope.setToolTip();
        });
      };

      $scope.setToolTip = function() {
        $timeout(function(){
          $('ul.tool').find('li')
              .popover({
              placement: 'right',
              html: true,
              trigger: 'manual'
            }).on('show.bs.popover', function(){
              $('ul.tool').find('li').not(this).popover('hide');
            }).mouseenter(function(e) {
              $(this).popover('show');
            }).on('click', function(){
              $('ul.tool').find('li').popover('hide');
            });
        });
      };

      $scope.setPopovers = function(tool){
        if(typeof tool.description === "undefined") {
            tool.description = "This item is currently under development. Please stay tuned.";
        }

        return "<div><div class='row'><div class='col-md-12'><p class='greeting'>" + tool.title + "</p>" + tool.description + "</div></div>" +
          "<div class='row second'><div class='col-md-9 icons'><span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-font fa-stack-1x'></i></span><span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-users fa-stack-1x'></i></span><span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-comments fa-stack-1x'></i></span></div>" +
          "<div class='col-md-3'><a href='/assessments' class='btn btn-primary'>Go</a></div></div>" + "</div>"
      }

      SessionService.setUserTemplate(
        $scope,
        'client/views/home/home_user.html',
        'client/views/home/home_anon.html'
      );

    }
]);
