module PDRClient
  class Engine < ::Rails::Engine
    initializer "PDRClient.assets.precompile" do |app|
      app.config.assets.precompile += %w(pdr_client.css pdr_client.js)
      app.config.assets.paths << app.root.join('app', 'assets', 'fonts')
    end
  end
end
