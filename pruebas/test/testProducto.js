let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const insertar = require('../../routes/products')
chai.use(chaiHttp);
const url_debito= 'http://localhost:3000';
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.json({extended:false});

describe('Insertar un Producto',()=>{
 	it('Deberia retornar un true al insertar producto', (done)=>{
		let id = insertar.numero+1;
        let product = {
            id_producto: id,
            nombre: "camara web",
            cantidad: 16,
            foto: "https://www.imeqmo.com/web/image/335854/c925e-webcam%20(1).png"
        }
        insertar.numero = insertar.numero+1;
        let valor = insertar.add(product);
		chai.assert.equal(false,valor , "Deberia retornar true")
		done();
	
	});
});
