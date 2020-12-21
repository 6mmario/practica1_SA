pipeline {
 
  agent any
    
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/desog/practica1_SA.git'
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('TEST') {
      steps {
        sh '''
        cd pruebas
        npm install
        npm test
        '''
      }
    }
    
     
    stage('Build Image') {
      steps {
         sh '''
            docker build -t desog1/practicasa .
            
            
            cat ~/my_password.txt | docker login --username desog1 --password-stdin
            docker push desog1/practicasa
           
         '''
      }

    
  }
  stage('Deploy') {
      steps {
          sh 'cp ./Produccion_Recipies/default.rb /home/diego/chef-repo/cookbooks/desog_cookbook/recipes'
          sh 'cp ./Test_Recipies/default.rb /home/diego/chef-repo/cookbooks/test_cookbook/recipes'
          
          sh '''
          cd /home/diego/chef-repo/.chef
          knife cookbook delete test_cookbook -y'''
          
          sh '''
          cd /home/diego/chef-repo/.chef
          knife cookbook delete desog_cookbook -y'''
          
          sh '''
          cd /home/diego/chef-repo/.chef
          knife cookbook upload test_cookbook -y'''
          
          sh '''
          cd /home/diego/chef-repo/.chef
          knife cookbook upload desog_cookbook -y'''
          
          sh '''
          
          cd /home/diego/chef-repo/.chef
          knife bootstrap 35.232.160.28 -x diego -P desog.org --node-name client-produccion --sudo --run-list 'recipe[desog_cookbook]' -y
          '''
          
          sh '''
          
          cd /home/diego/chef-repo/.chef
          knife bootstrap 35.238.57.13 -x diego -P desog.org --node-name client-test --sudo --run-list recipe[test_cookbook] -y
          '''
      
      }

    
  }
 
}
}