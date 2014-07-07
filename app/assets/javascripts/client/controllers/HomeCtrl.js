PDRClient.controller('HomeCtrl', [
  '$scope',
  'ToolKit',
  'SessionService',
  '$timeout',
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
        var noLinkInfo = '<p class="no-link">This item is currently under development. Please stay tuned.</p>';
        var htmlFornoLinkInfo = "<div><div class='row'><div class='col-md-12'><p class='greeting'>" + tool.title + "</p>" + '<p class="description">' + tool.description + '</p>'  + '<p>'  +  noLinkInfo + "</p>" + "</div></div>";

        if (tool.title == "Readiness Assessment" ) {
          return "<div><div class='row'><div class='col-md-12'><p class='greeting'>" + tool.title + "</p>" + '<p class="description">' + tool.description + '</p>' + "</div></div>" +
            "<div class='row second'><div class='col-md-9 icons'><span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-font fa-stack-1x'></i></span><span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-users fa-stack-1x'></i></span><span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-comments fa-stack-1x'></i></span></div>" +
            "<div class='col-md-3'><a href='/#/assessments' class='btn btn-primary'>Go</a></div></div>" + "</div>";
        };

        if (tool.title == "End User Survey") {
          tool.description = 'This survey is designed to understand the end user’s (i.e. teacher’s) points of view on the current state of Professional Development (PD) as well as their desired future state.';
          return htmlFornoLinkInfo;
        };

        if (tool.title == 'Technology Diagnostic Product Inventories') {
          tool.description = 'The tool helps districts identify the gaps in their data, delivery and product lines so that purchasing and integration priorities can be established. The language and terminology of the information gathering template and the output of the technology diagnostic are based on the D2S framework.';
          return htmlFornoLinkInfo;
        };

        if (tool.title == 'RFP Guidelines') {
          tool.description = 'This document provides a list of considerations for the districts to help improve communication among the districts, vendors, and other stakeholders of the PD marketplace.';
          return htmlFornoLinkInfo;
        };

        if (tool.title == 'Demand-to-Supply Framework') {
          tool.description = 'This framework establishes a view of the processes, technologies, and actors involved in the delivery of PD, centered around core PD use cases and provides a means of classifying products and services that support PD functions.';
          return htmlFornoLinkInfo;
        };

        return noLinkInfo;

      }

      SessionService.setUserTemplate(
        $scope,
        'client/views/home/home_user.html',
        'client/views/home/home_anon.html'
      );

    }
]);
