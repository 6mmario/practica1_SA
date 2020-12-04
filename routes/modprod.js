var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/modprod', function(req, res, next) {
  res.render('modprod', { title: 'Modifiación de productos' });
});

router.post('/modprod',function(req,res,next){
  var opts = {
    uri: 'http:/34.66.231.1:3005/ModificarProducto',
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
      res.render('modprod', { title: 'Producto creado' });
    }else{
      res.render('modprod', { title: 'Error al momento de modificar' });
    }
});

})

module.exports = router;
