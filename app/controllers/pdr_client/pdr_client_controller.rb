class PdrClient::PdrClientController < ActionController::Base
  def index
    render text: 'in client' 
  end
end
