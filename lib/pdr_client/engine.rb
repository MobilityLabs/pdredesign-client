require 'bundler/setup'
require 'rails' unless defined?(Rails)
require 'action_view' unless defined?(ActionView)

module PdrClient
  class Engine < ::Rails::Engine
    isolate_namespace PdrClient

    require 'bootstrap-sass'
    require 'font-awesome-rails'
    require 'angular-rails-templates'
    require 'redactor-rails'
    require 'rails-assets-underscore'
    require 'rails-assets-jquery'
    require 'rails-assets-angular'
    require 'rails-assets-angular-route'
    require 'rails-assets-angular-resource'
    require 'rails-assets-angular-sanitize'
    require 'rails-assets-angular-ui-router'
    require 'rails-assets-angular-ui-utils'
    require 'rails-assets-momentjs'
    require 'rails-assets-angular-redactor'
    require 'rails-assets-angular-bootstrap'
    require 'rails-assets-angular-moment'
    require 'rails-assets-angular-file-upload'
    require 'rails-assets-rollbar'
    require 'rails-assets-angular-shims-placeholder'

    require 'selectize-rails'
    require 'rails-assets-highcharts'
    require 'bootstrap3-datetimepicker-rails'

    require 'pdfkit'
    require 'csv'
    require 'pdr_client/railtie' if defined?(Rails)

    initializer "public_assets" do |app|
      config.assets.paths << "#{root}/public"
      app.middleware.insert_before(
          ::ActionDispatch::Static,
          ::ActionDispatch::Static,
          "#{root}/public"
          )
    end

  end
end
