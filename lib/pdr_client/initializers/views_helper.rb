module PdrClient
  module Initializers
    class ViewsHelper < Rails::Railtie
      initializer "pdr_client.view_helpers" do
        PdrClient::ApplicationController.helper(PdrClient::ReportsHelper)
      end
    end
  end
end
