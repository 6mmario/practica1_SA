#
# Cookbook:: desog_cookbook
# Recipe:: default
#
# Copyright:: 2020, The Authors, All Rights Reserved.
docker_service 'default' do
    action [:create, :start]
  end
  
  docker_image 'desog1/practicasa' do
    action :pull
  end
  
  docker_container 'produccion' do
    repo 'desog1/practicasa'
    port '8082:3000'
  end
  