require 'spec_helper'

describe PdrClient::ReportsController, type: :controller do
  routes { PdrClient::Engine.routes }

  let(:consensus_params) do 
    return {
      assessment: { name: "some_name", organized_by: "someone", data: "dontremember" }, 
      consensus:  { id: 1, is_completed: true, assessment_id: 1, participants: [], categories:[], questions: [] } 
    } 
  end

  before(:each) do
    @assessment_double = double('ActiveRecord::AssessmentObject')
    allow(@assessment_double).to receive(:find).and_return(@assessment_double)
    allow(@assessment_double).to receive(:consensus).and_return(@assessment_double)
    allow(@assessment_double).to receive(:rubric).and_return(@assessment_double)
    allow(@assessment_double).to receive(:categories).and_return(@assessment_double)
    allow(@assessment_double).to receive(:team_roles_for_participants).and_return(@assessment_double)

    Assessment = @assessment_double

  end

  context "Requiring Consensus pdf" do
    it "GET#report.pdf" do
      allow(controller).to receive(:render_to_string).and_return("{}")
      post :consensus_report, { assessment_id: 1, format: :pdf }
      expect(response.body).to match("PDF")
      expect(response.headers["Content-Disposition"]).to eq("attachment; filename=\"report.pdf\"")
      expect(response.headers['Content-Type']).to eq('application/pdf')
      assert_response :success
    end
  end

  context "Requiring Concensus csv" do
    it "GET#report.csv" do
      allow(controller).to receive(:render_to_string).and_return("{}")
      post :consensus_report, { assessment_id: 1, format: :csv }
      expect(response.headers["Content-Disposition"]).to eq("attachment; filename=report.csv")
      expect(response.headers['Content-Type']).to eq('text/csv')
      assert_response :success
    end
  end
end
