include 'docker'

  docker::image {'desog1/practicasa':
     image_tag => 'latest'
  }

  docker::run{'pruebas':
     image      => 'desog1/practicasa',
     expose     => ['3000:8081'],
  }
