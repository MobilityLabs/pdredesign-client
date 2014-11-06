class PdrClient::ReportsController < PdrClient::ApplicationController
  layout false
  before_action :consensus_data
  
  def consensus_report
    respond_to do |format|
      format.pdf { render pdf: :report }
      format.csv { render csv: :report }
    end
  end

  private
  def consensus_data
    @assessment = HashWithIndifferentAccess.new( params[:assessment] )
    @consensus  = HashWithIndifferentAccess.new( params[:consensus] )
    @questions  = questions if @consensus[:categories]
  end

  def questions
    questions = []
    @consensus[:categories].each{|category| questions = questions + category[:questions]}
    return questions
  end
end
