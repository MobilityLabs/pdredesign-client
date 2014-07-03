#!/usr/bin/env gem build
$:.push File.expand_path("../lib", __FILE__)

require 'pdr_client/version'

Gem::Specification.new do |s|
  s.name          = "pdr_client"
  s.authors       = ["Sumeet Singh"]
  s.email         = "ortuna@gmail.com"
  s.homepage      = ""
  s.description   = "A mountable engine for the PD Redesign server"
  s.summary       = ""
  s.version       = PdrClient::Version
  s.date          = Time.now.strftime("%Y-%m-%d")
  s.files         = `git ls-files`.split("\n") | Dir.glob("{lib}/**/*")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  s.rdoc_options  = ["--charset=UTF-8"]
  s.required_rubygems_version = ">= 1.3.6"


  s.add_dependency('rails')
  s.add_dependency('sass-rails')
  s.add_dependency('uglifier', '>= 1.3.0')
  s.add_dependency('jquery-rails')
  s.add_dependency('font-awesome-rails')
  s.add_dependency('bootstrap-sass')
  s.add_dependency('haml')
  s.add_dependency('angular-rails-templates', '>= 0.1.3')

  s.add_dependency("rails-assets")
  s.add_dependency('rails-assets-moment')
  s.add_dependency('rails-assets-underscore')
  s.add_dependency('rails-assets-highcharts', '= 3.0.7')
  s.add_dependency('rails-assets-angular')
  s.add_dependency('rails-assets-angular-route')
  s.add_dependency('rails-assets-angular-sanitize')
  s.add_dependency('rails-assets-angular-resource')
  s.add_dependency('rails-assets-angular-ui-router')
  s.add_dependency('rails-assets-momentjs')
  s.add_dependency('rails-assets-angular-redactor')
  s.add_dependency('rails-assets-angular-bootstrap')
  s.add_dependency('rails-assets-angular-moment')
  s.add_dependency('rails-assets-angular-ui-utils')
  s.add_dependency('redactor-rails')

  s.add_dependency('selectize-rails')
  s.add_dependency('bootstrap3-datetimepicker-rails')

  s.add_development_dependency("jasmine")
  s.add_development_dependency('combustion')
  s.add_development_dependency('rails-assets-angular-mocks')
  s.add_development_dependency("pry")
  s.add_development_dependency("rake")
  s.add_development_dependency("rspec")
end
