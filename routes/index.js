var express = require('express');
var router = express.Router();
var request = require('request');
var productos = require('./products');
/* GET home page. */
var sess;
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('index', { title: 'Log In' });
});

router.post('/catalogo',function(req,res,next){
  req.session.id = req.body.idusuario
  req.session.iduser = {
    iduser: req.body.idusuario
  }
  if(req.body.idusuario==="admin" && req.body.contrasena==="1234"){

 
    let objeto = productos.products;
    //console.log(objeto.data)
    res.render('catalogo', { title: 'Catálogo', productos:objeto.data});
    
   
        
      }else{
        res.render('index', { title: 'Error de autenticación' });
      }
 
});

router.get('/creauser', function(req, res, next) {
  res.render('crearuser', { title: 'Creación de usuario' });
});

router.get('/creaprod', function(req, res, next) {
  res.render('crearprod', { title: 'Creación de productos' });
});

router.get('/modprod', function(req, res, next) {
  let id_producto = req.query.id_producto;
  console.log(id_producto)
  res.render('modprod', { title: 'Modificación de productos', id:id_producto});
});

router.get('/moduser', function(req, res, next) {
  res.render('moduser', { title: 'Modificación de usuarios' });
});

router.get('/salidaprod', function(req, res, next) {
  res.render('salidaprod', { title: 'Salida de productos' });
});

router.get('/ingresprod', function(req, res, next) {
  res.render('ingresprod', { title: 'Ingreso de productos' });
});

//------------INGRESO Y SALIDA DESDE EL CATALOGO
router.post('/salidaproducto', function(req, res, next) {
  res.render('salidaprod', { title: 'Salida de productos', idprod: req.body.idprod });
});

router.post('/ingresoproducto', function(req, res, next) {
  
  res.render('ingresprod', { title: 'Ingreso de productos', idprod: req.body.idprod });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Menú' });
});

router.post('/creauser',function(req,res,next){
  var opts = {
    uri: 'http://34.66.231.1:3001/crearusuario',
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
      res.render('crearuser', { title: 'Usuario creado' });
      
    }else{
      res.render('index', { title: 'Error de autenticación' });
    }
});
})

router.post('/creaprod',function(req,res,next){
    let id = productos.numero+1;
    let product = {
        id_producto: id,
        nombre: req.body.nombre,
        cantidad: req.body.cantidad,
        foto: req.body.foto
    }
    productos.numero = productos.numero+1;
    console.log(product)
    let respuesta = productos.add(product);
    if(respuesta === true){
      res.render('crearprod', { title: 'Producto creado',msg:"Producto Creado" });
    }else{
      res.render('crearprod', { title: 'Error al momento de crear',msg:"Producto No Creado"  });
    }

})

router.post('/ingresprod',function(req,res,next){
  if(req.session.id){
    let body = req.body;
    body.idusuario = req.session.iduser.iduser;
    console.log(JSON.stringify(body))
  var opts = {
    uri: 'http://34.66.231.1:3001/ingresarproducto',
    method: 'POST',
        body: JSON.stringify(body),
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
  }else{
    res.render('index', { title: 'Login' });
  }
  
})

router.post('/modprod',function(req,res,next){
  if(req.session.id){
    console.log(req.body)
  var opts = {
    uri: 'http://34.66.231.1:3005/ModificarProducto',
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
    if(respuesta.Estado == true){
      res.render('modprod', { title: 'Producto modificado', msg:"Producto Modificado" });
    }else{
      res.render('modprod', { title: 'Error al momento de modificar', msg:"Error al modificar" });
    }
});
  }

  
})

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

router.post('/salidaprod',function(req,res,next){
  if(req.session.id){
    let body = req.body;
    body.idusuario = req.session.iduser.iduser;
    console.log(JSON.stringify(body))
  
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
}
})

router.post('/productos',function(req,res,next){

    let objeto = productos.products;
    //console.log(objeto.data)
    res.render('catalogo', { title: 'Catálogo', productos:objeto.data});
    
   
        
      
  
})


module.exports = router;
