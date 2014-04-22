module PdrClient
  class Engine < ::Rails::Engine
    isolate_namespace PdrClient
    require 'bootstrap-sass'
    require 'haml'
    require 'rails-assets'
    require 'rails-assets-angular'
    require 'rails-assets-angular-resource'
    require 'rails-assets-angular-sanitize'

    initializer "PDRClient.assets.precompile" do |app|
      app.config.assets.precompile += %w(pdr_client.css pdr_client.js)
    end
  end
end
