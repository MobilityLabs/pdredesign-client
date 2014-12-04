module PdrClient
  module Initializers
    class Assets < Rails::Railtie
      
      initializer "PDRClient.assets.precompile", :group => :all do |app|
        app.config.angular_templates.ignore_prefix = %w(templates)
        app.config.assets.precompile += %w(pdr_client.css pdr_client.js)
      end

    end
  end
end
