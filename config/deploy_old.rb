
    require 'bundler/capistrano'
    #load "config/recipes/base"     
    set :application, 'wireframe'
    set :rvm_ruby_string, '1.9.3'
    set :rvm_type, :user
     
    # SSH configuration
    set :user, 'dealsjg1'
    set :use_sudo, false
    set :location, "208.91.198.231"
    ssh_options[:port] = 21
    default_run_options[:pty] = true
    
    ##set :default_environment, {
     ## 'PATH' => '/home/myuser/bin:/home/myuser/ruby/gems/bin:/usr/local/bin:/bin:/usr/bin',
      ##'RUBYOPT' => '-I/home/myuser/rubygems/inst/lib',
      ##'GEM_PATH' => '/home/myuser/ruby/gems:/usr/lib/ruby/gems/1.8',
      ##'GEM_HOME' => '/home/myuser/ruby/gems'
    ##}
     
    # Source repository taken for deployments
    ## set :local_repository, 'ssh://dealsjg1@#{location}/home/dealsjg1/RameshPalanivel/wireframe.git' 
    set :scm, :git
    set :scm_username, "dealsjg1"
    set :repository, "ssh://dealsjg1@#{location}/home/dealsjg1/RameshPalanivel/wireframe.git/"
    set :branch, "master"    
    #set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
    # Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
    set :bundle_flags, ''
     
    # Destination of deployments
    set :deploy_to, '/home/dealsjg1/wireframe_deployed'
    # set :deploy_via, :copy
     
    role :web, 'dealshikari.com'                          # Your HTTP server, Apache/etc
    role :app, 'dealshikari.com'                          # This may be the same as your `Web` server
    role :db,  'dealshikari.com', :primary => true # This is where Rails migrations will run
     
    # if you want to clean up old releases on each deploy uncomment this:
    after 'deploy:update_code', 'bundler:install'
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

 #namespace :deploy do
  #desc "Install everything onto the server"
  #task :install do
     #run "bundle install"
   # run "#{sudo} apt-get -y update"
   # run "#{sudo} apt-get -y install python-software-properties"
  #end
 #end



   #namespace :db do
   #desc "Resets the #{rails_env} Database"
   #task :migrate_reset do
    #puts "\n\n=== Resetting the #{rails_env}  Database! ===\n\n"
    #run "cd #{current_path}; rake db:migrate:reset RAILS_ENV=#{rails_env}"
   #end
  # end

     
    # Unicorn tasks
    require 'capistrano-unicorn'
    after 'deploy:restart', 'unicorn:reload' # app IS NOT preloaded
    after 'deploy:restart', 'unicorn:restart'  # app preloaded


