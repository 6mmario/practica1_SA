var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/creauser', function(req, res, next) {
  res.render('crearuser', { title: 'Log In' });
});

router.post('/catalogo',function(req,res,next){
  var opts = {
    uri: 'http://34.66.231.1:3001/login',
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
      request.get("http://34.66.231.1:3005/MostrarProductos",(error,response,body)=>{
    if(error) {
      return console.dir(error);
  }
  let objeto = JSON.parse(body);
  console.log(objeto.data)
  res.render('catalogo', { title: 'catalogo', productos:objeto.data});
  
  })
      
    }else{
      res.render('index', { title: 'Error de autenticación' });
    }
});

})

module.exports = router;
