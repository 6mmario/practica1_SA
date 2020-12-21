#
# Cookbook:: test_cookbook
# Recipe:: default
#
# Copyright:: 2020, The Authors, All Rights Reserved.
docker_service 'default' do
    action [:create, :start]
  end
  
  docker_image 'desog1/practicasa' do
    action :pull
  end
  
  docker_container 'test' do
    repo 'desog1/practicasa'
    port '8084:3000'
  end
  