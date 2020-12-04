var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/salidaprod', function(req, res, next) {
  res.render('salidaprod', { title: 'Salida de productos' });
});

router.post('/salidaprod',function(req,res,next){
  var opts = {
    uri: 'http://34.66.231.1:3005/SalidaProducto',
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
      res.render('salidaprod', { title: 'Salida del producto' });
    }else{
      res.render('salidaprod', { title: 'Error en la salida del producto' });
    }
});

})

module.exports = router;
