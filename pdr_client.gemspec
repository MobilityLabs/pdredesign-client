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


  s.add_dependency('rails', '4.2.1')
  s.add_dependency('sass-rails', '5.0.3')
  s.add_dependency('uglifier', '>= 1.3.0')
  s.add_dependency('font-awesome-rails', '4.3.0')
  s.add_dependency('bootstrap-sass', '3.3.4.1')
  s.add_dependency('haml', '4.0.6')

  s.add_dependency('rails-assets-moment', '2.10.3')
  s.add_dependency('rails-assets-jquery', '2.1.4')
  s.add_dependency('rails-assets-underscore', '1.8.3')
  s.add_dependency('rails-assets-highcharts', '= 3.0.10')
  s.add_dependency('rails-assets-angular', '~> 1.2.0')
  s.add_dependency('rails-assets-angular-route', '1.2.28')
  s.add_dependency('rails-assets-angular-sanitize', '1.2.28')
  s.add_dependency('rails-assets-angular-resource', '1.2.28')
  s.add_dependency('rails-assets-angular-ui-router', '0.2.15')
  s.add_dependency('rails-assets-momentjs', '2.10.3')
  s.add_dependency('rails-assets-angular-redactor', '1.1.4')
  s.add_dependency('rails-assets-angular-bootstrap', '0.12.1')
  s.add_dependency('rails-assets-angular-moment', '0.10.1')
  s.add_dependency('rails-assets-angular-ui-utils', '0.2.3')
  s.add_dependency('rails-assets-angular-file-upload', '~> 1.1.5')
  s.add_dependency('rails-assets-rollbar', '1.2.2')
  s.add_dependency('rails-assets-angular-shims-placeholder', '0.4.2')
  s.add_dependency('redactor-rails', '0.5.0')

  s.add_dependency('angular-rails-templates', '= 0.2.0')

  s.add_dependency('selectize-rails', '0.12.1')
  s.add_dependency('bootstrap3-datetimepicker-rails', '~> 3.1.0')
  s.add_dependency('wkhtmltopdf-binary', '0.9.9.3')
  s.add_dependency('pdfkit', '0.6.2')


  s.add_development_dependency("jasmine", '2.3.0')
  s.add_development_dependency('combustion', '0.5.3')
  s.add_development_dependency('rails-assets-angular-mocks', '1.2.28')
  s.add_development_dependency("pry", '0.10.1')
  s.add_development_dependency("rake", '10.5.0')
  s.add_development_dependency("rspec", '3.2.0')
end
