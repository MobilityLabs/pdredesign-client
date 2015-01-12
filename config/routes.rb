PdrClient::Engine.routes.draw do
  root to: 'pdr_client#index'
  
  post 'v1/assessments/:assessment_id/reports/consensus_report', to: 'reports#consensus_report'
end
