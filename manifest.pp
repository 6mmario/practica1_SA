include 'docker'

  docker::image {'nginx':
     image_tag => 'latest'
  }

  docker::run{'helloworld':
     image      => 'nginx',
     ports      => ['8080', '80'],
  }
