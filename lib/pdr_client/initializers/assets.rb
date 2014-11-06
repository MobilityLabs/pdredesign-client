module PdrClient
  module Initializers
    class Assets < Rails::Railtie
      
      initializer "PDRClient.assets.precompile", :group => :all do |app|
        app.config.angular_templates.ignore_prefix = %w(templates)
        app.config.assets.precompile += %w(pdr_client.css pdr_client.js)
      end

      initializer "public_assets" do |app|
        config.assets.paths << "#{Rails.root}/public"
        app.middleware.insert_before(
          ::ActionDispatch::Static,
          ::ActionDispatch::Static,
          "#{Rails.root}/public"
        )
      end
    end
  end
end
