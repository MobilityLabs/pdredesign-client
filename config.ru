require 'rubygems'
require 'bundler'

Bundler.require :default, :development, :test

Combustion.initialize! :action_controller, :action_view, :sprockets

run Combustion::Application
