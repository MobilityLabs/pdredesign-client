# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'

# These are classess and modules defined in PdrServer that are needed when the rspec are running

module ApplicationHelper;end
module ScoreQuery;end

require 'combustion'

Combustion.initialize! :action_controller, :action_view, :sprockets
require 'rspec/rails'

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_base_class_for_anonymous_controllers = false
  config.order = "random"
end