    var products = exports.products = {data:[{
        id_producto: 1,
        nombre: 'pollo',
        cantidad: 6,
        foto: 'https://www.65ymas.com/uploads/s1/36/47/4/por-que-la-carne-de-pollo-gusta-y-se-consume-tanto.jpeg'
    },{
        id_producto: 2,
        nombre: 'Television',
        cantidad: 16,
        foto: 'https://as.com/meristation/imagenes/2019/08/28/betech/1567023886_456249_1567026576_noticia_normal.jpg'
    }
        
    ]
    }
    
    exports.add = (items)=>{
        
        try {
            console.log(items)
            products.data.push(items)
            return true;    
        } catch (error) {
            console.log(error)
            return false;
        }
        
    }

    exports.numero = 2;



//module.exports = add;