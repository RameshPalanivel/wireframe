require 'bundler/capistrano'
 
set :application, 'wireframe'
 
# SSH configuration
set :user, 'dealsjg1'
set :use_sudo, false
ssh_options[:port] = 2082
default_run_options[:pty] = true
set :default_environment, {
  'PATH' => '/home/dealsjg1/bin:/home/dealsjg1/ruby/gems/bin:/usr/local/bin:/bin:/usr/bin',
  'RUBYOPT' => '-I/home/dealsjg1/rubygems/inst/lib',
  'GEM_PATH' => '/home/dealsjg1/ruby/gems:/usr/lib/ruby/gems/1.8',
  'GEM_HOME' => '/home/dealsjg1/ruby/gems'
}
 
# Source repository taken for deployments
set :location ,"208.91.198.231"
set :branch, "master"
set :scm_username, "RameshPalanivel"
set :local_repository,  'ssh://dealsjg1@#{location}:2082/home/dealsjg1/wireframe.git'
set :repository, '/home/dealsjg1/wireframe.git'
set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
set :bundle_flags, ''
 
# Destination of deployments
set :deploy_to, '/home/dealsjg1/wireframe_deployed'
# set :deploy_via, :copy
 
role :web, 'dealshikari.com'                          # Your HTTP server, Apache/etc
role :app, 'dealshikari.com'                          # This may be the same as your `Web` server
role :db,  'dealshikari.com', :primary => true # This is where Rails migrations will run
 
# if you want to clean up old releases on each deploy uncomment this:
after 'deploy:restart', 'deploy:cleanup'
 
# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts
 
# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end
 
