begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

namespace :jasmine do
  desc 'jasmine with comustion engine'
  task :combust do
    begin
      start_server
      at_exit { kill_server }
      Rake::Task["jasmine:ci"].invoke
    end
  end
end

def start_server
  system 'rackup -p 3000 -D -P rack.pid'
end

def kill_server
  pid = File.read('rack.pid')
  system "kill #{pid}"
end
