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
          
      
      }

    
  }
 
}
}