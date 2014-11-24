PDRClient.service('ConsensusHelper',
  ['$q',
  '$http',
  '$rootScope',
  'Consensus',
  'UrlService',
  function($q, $http, $rootScope, Consensus, UrlService) {
    var $scope = this;

    $scope.downloadAction   = function(data, download_type){
      //download_type, should contain mime_type, file_ext

      if(download_type.file_ext == "pdf"){
        var blob  = new Blob([data], {type: download_type.mime_type});
        var url   = URL.createObjectURL(blob);
      }else{
        var url   = 'data:application/csv;charset=utf-8,' + encodeURI(data)
      }

      var link = angular.element('<a/>');
      link.attr({
         href: url,
         target: '_blank',
         download: 'report.'+download_type.file_ext
      })[0].click();
      $rootScope.$broadcast('success_change');
    };

    $scope.consensuToPDF    = function(assessment, responseId, teamRole){
      $rootScope.$broadcast('start_change');

      var consensusData   = Consensus.get({assessment_id: assessment.id,
        id: responseId,
        team_role: teamRole}, function(data){
          var params = {
            assessment: {
              name:         assessment.name, 
              organized_by: assessment.facilitator.full_name,
              date:         assessment.created_at
            },
            consensus: data
          };

          $http.post(UrlService.url('consensus_report.pdf'), params, {responseType: "arraybuffer"}).
            success(function(data, status, headers, config){
              $scope.downloadAction(data, {
                mime_type: 'application/pdf',
                file_ext:  'pdf'
              });
            });
        });
    };

    $scope.consensuToCSV    = function(assessment, consensus_id){
      $rootScope.$broadcast('start_change');
      var report_url        = UrlService.url('consensus_report.csv');

      Consensus.report({assessment_id: assessment.id, id: consensus_id}, function(report_data){
        var params = {
          consensus: report_data
        };

        $http.post(report_url, params).
          success(function(data, status, headers, config){
            $scope.downloadAction(data, {
                mime_type: 'application/csv',
                file_ext:  'csv'
              });
          });
      });
    };

  }]);
