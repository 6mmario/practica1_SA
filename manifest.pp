include 'docker'

  docker::image {'nginx':
     image_tag => 'latest'
  }

  docker::run{'holamundo':
     image      => 'nginx',
     ports      => ['8080', '80'],
  }
