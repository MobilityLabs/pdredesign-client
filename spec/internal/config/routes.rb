Rails.application.routes.draw do
  #
  mount PdrClient::Engine, at: "/", as: :pdr_client
end
