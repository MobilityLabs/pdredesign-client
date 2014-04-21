module PdrClient
  class Engine < ::Rails::Engine
    isolate_namespace PdrClient

    initializer "PDRClient.assets.precompile" do |app|
      app.config.assets.precompile += %w(pdr_client.css pdr_client.js)
    end
  end
end
