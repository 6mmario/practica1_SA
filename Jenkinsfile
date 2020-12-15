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
          
          sh '''
            cp manifest.pp /etc/puppetlabs/code/environments/production/manifests/
            cp manifestproduction.pp /etc/puppetlabs/code/environments/testing/manifests/
            '''
            
        sh "ssh -n -f diego@35.202.145.123 'sudo /opt/puppetlabs/bin/puppet agent --environment=production --test '"
        sh "ssh -n -f diego@104.155.190.31 'sudo /opt/puppetlabs/bin/puppet agent --environment=testing --test '"
     
      }

    
  }
 
}
}