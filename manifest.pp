include 'docker'

  docker::image {'desog1/practicasa':
     image_tag => 'latest'
  }

  docker::run{'pruebas':
     image      => 'desog1/practicasa',
     ports      => ['8081:3000'],
  }
