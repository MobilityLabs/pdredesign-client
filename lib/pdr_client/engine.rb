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
    require 'rails-assets-momentjs'
    require 'rails-assets-angular-redactor'
    require 'redactor-rails'
    require 'rails-assets-angular-bootstrap'
    require 'rails-assets-angular-moment'

    require 'selectize-rails' 
    require 'rails-assets-highcharts'
    require 'bootstrap3-datetimepicker-rails'

    initializer "PDRClient.assets.precompile", :group => :all do |app|
      app.config.angular_templates.ignore_prefix = true
      app.config.assets.precompile += %w(pdr_client.css pdr_client.js)
    end

    initializer "public_assets" do |app|
      config.assets.paths << "#{root}/public"
      app.middleware.insert_before(::ActionDispatch::Static, ::ActionDispatch::Static, "#{root}/public")
    end
  end
end
