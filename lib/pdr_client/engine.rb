require 'rails' unless defined?(Rails)
require 'action_view' unless defined?(ActionView)

module PdrClient
  class Engine < ::Rails::Engine
    isolate_namespace PdrClient
    require 'bootstrap-sass'
    require 'font-awesome-rails'
    require 'angular-rails-templates'
    require 'rails-assets'
    require 'rails-assets-angular'
    require 'rails-assets-angular-route'
    require 'rails-assets-angular-resource'
    require 'rails-assets-angular-sanitize'
    require 'rails-assets-angular-ui-router'

    initializer "PDRClient.assets.precompile", :group => :all do |app|
      app.config.angular_templates.ignore_prefix = true
      app.config.assets.precompile += %w(pdr_client.css pdr_client.js)
    end
  end
end
