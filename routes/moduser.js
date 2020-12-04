var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/moduser', function(req, res, next) {
  res.render('moduser', { title: 'Modificación de usuario' });
});

router.post('/moduser',function(req,res,next){
  var opts = {
    uri: 'http://34.66.231.1:3005/ModificarUsuario',
    method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
  }
  request(opts, function (error, response) {
        
    if (error) { console.log(error);
        return res.send({ status: 'error', details: error }); }
    console.log(error, response.body);
    //return res.send(JSON.parse(response.body));
    let respuesta = JSON.parse(response.body)
    if(respuesta.estado == true){
      res.render('moduser', { title: 'Usuario modificado' });
    }else{
      res.render('moduser', { title: 'Error al momento de modificar' });
    }
});

})

module.exports = router;
