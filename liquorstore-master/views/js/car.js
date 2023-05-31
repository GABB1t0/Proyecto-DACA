const car = []; //array carrito contendra todos los productos seleccionados por el cliente

export function buscarCoincidencia(array, str) {
    return array.some(objeto => objeto.id_producto === str);
}

export function crearItemLocalStorage(item,value) {
    localStorage.setItem(item, JSON.stringify(value));
}

export function actualizarItemLocalStorage(item, nuevoValor) {
    localStorage.setItem(item, JSON.stringify(nuevoValor));
}

export function extraerDatosLocalStorage(item) {
    const data = localStorage.getItem(item);
    if (data) {
      // Si el item existe en el LocalStorage, se devuelve su contenido
      return JSON.parse(data);
    } else {
      return false;
    }
}
  
export const functions_car = {

    addCar : (id_producto, cantidad = 1) => {

        //Creamos el prototipo del objeto producto
        const producto = {
            id_producto,
            cantidad,
        }

        //Extraigo datos del localStorage
        let data = extraerDatosLocalStorage('carrito');

        if(data !== false){
        
            if(data.length === 0 ){
                
                //Agregamos el producto al carrito
                data.push(producto);
    
                //Actualizamos el localStorage
                actualizarItemLocalStorage('carrito',data);
            
            }else{
                
                //Verificamos si el producto ya se encuentra en el carrito
                let encontrado = buscarCoincidencia(data,id_producto);
        
                if(!encontrado){
                    data.push(producto);
    
                    //Actualizamos el localStorage
                    actualizarItemLocalStorage('carrito',data);
                }else{
                    alert('El Producto ya se encuentra en el carrito');
                }
        
            }
        }else{

            //Agregamos el objeto producto al carrito
            car.push(producto);

            // Si el item no existe en el LocalStorage, se crea el item
            crearItemLocalStorage('carrito',car);
            
            // // Se busca nuevamente el item
            // const data_item = localStorage.getItem(item);
            // //Retornamos el item
            // return JSON.parse(data_item);
        }

       
    
    }, // Agregar productos al carrito
    
    deleteCar : (item) => {

        //Extraigo datos del localStorage
        let data = extraerDatosLocalStorage('carrito');

        if(data) {
            
            let newData = data.filter( e => e.id_producto != item);

            //Actualizamos el localStorage
            actualizarItemLocalStorage('carrito', newData);
        }

    }, // Eliminar productos del carrito
    
    modificar_cantidad_productos : (data_p) => {

        const {id_product, cantidad} = data_p;

        console.log(id_product)
        console.log(cantidad)

        //Extraigo datos del localStorage
        let data = extraerDatosLocalStorage('carrito');
        console.log(data)

        //Obtenemos la data del producto a modificar
        let producto = data.filter(e => e.id_producto == id_product);
        console.log(producto[0]);

        // Modificamos la cantidad
        producto[0].cantidad = Number(cantidad);

        // Quitamos del array los datos desactualizados del producto
        let newData = data.filter(e => e.id_producto != id_product);
        console.log(newData)

        //Agregamos la data actualizada
        newData.push(producto[0]);

        //Actualizamos el localStorage
        actualizarItemLocalStorage('carrito',newData);

    }, // Aumentar la cantidad de un producto del carrito
}



