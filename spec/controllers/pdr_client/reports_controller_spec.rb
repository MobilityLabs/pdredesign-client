require 'spec_helper'

describe PdrClient::ReportsController, type: :controller do
  routes { PdrClient::Engine.routes }

  let(:consensus_params) do 
    return {  
      assessment: { name: "some_name", organized_by: "someone", data: "dontremember" }, 
      consensus:  { id: 1, is_completed: true, assessment_id: 1, participants: [], categories:[], questions: [] } 
    } 
  end

  context "Requiring Consensus pdf" do
    it "GET#report.pdf" do
      post :consensus_report, consensus_params.merge!(format: :pdf)
      expect(response.body).to match("PDF")
      expect(response.headers["Content-Disposition"]).to eq("attachment; filename=\"report.pdf\"")
      expect(response.headers['Content-Type']).to eq('application/pdf')
      assert_response :success
    end
  end

  context "Requiring Concensus csv" do
    it "GET#report.csv" do
      post :consensus_report, consensus_params.merge!(format: :csv)
      expect(response.headers["Content-Disposition"]).to eq("attachment; filename=report.csv")
      expect(response.headers['Content-Type']).to eq('text/csv')
      assert_response :success
    end
  end
end
