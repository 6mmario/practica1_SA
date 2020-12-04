var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/ingresprod', function(req, res, next) {
  res.render('ingresprod', { title: 'Ingreso de productos' });
});

router.post('/ingresprod',function(req,res,next){
  var opts = {
    uri: 'http://34.66.231.1:3004/ingresarproducto',
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
      res.render('ingresprod', { title: 'Producto ingresado' });
    }else{
      res.render('ingresprod', { title: 'Error al momento de ingresar' });
    }
});

})

module.exports = router;
