class PdrClient::PdrClientController < ActionController::Base
  layout :application

  def index
    render text: 'in client' 
  end
end
