# Production specific settings
if env == "production"
  # Help ensure your application will always spawn in the symlinked
  # "current" directory that Capistrano sets up.
  working_directory '/home/dealsjg1/dealsjg1_deployed/current'
  
  # feel free to point this anywhere accessible on the filesystem
  user 'dealsjg1', 'mygroup'
  shared_path = '/home/myuser/myapp_deployed/current'
  
  stderr_path '/home/dealsjg1/dealsjg1_deployed/current/log/unicorn.stderr.log'
  stdout_path '/home/dealsjg1/dealsjg1_deployed/current/log/unicorn.stdout.log'
end
