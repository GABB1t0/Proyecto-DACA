import { url } from "./urls.js";
import { alerta } from "./utils.js";

const {url_productos, url_compra, url_inventario} = url;

const d = document,
$inventario = d.querySelector('#inventario'),
$lista_productos_inventario = d.querySelector('#lista_productos_inventario'),
$fragment_list = d.createDocumentFragment() ;

let datos_productos;
let datos_compras;

//MOSTRAR LOS DATOS EN PANTALLA
const show_lista_productos = (lista_productos_seleccionados) => {

    //enlazamos el template creado en el HTML
    const $items_lista_productos = d.querySelector('#template_items_productos_inventario').content;

    if(lista_productos_seleccionados.length > 0){

        lista_productos_seleccionados.forEach(elemento => {
            //Insertamos los datos en el template
            $items_lista_productos.querySelector('.name_product').textContent = elemento['nombre_producto'];
            $items_lista_productos.querySelector('.cod_product').textContent = elemento['codigo_producto'];
            $items_lista_productos.querySelector('.stock').textContent = elemento['cantidad_disponible'] === null ? 0 : elemento['cantidad_disponible'];
            $items_lista_productos.querySelector('.price').textContent = elemento['precio'] === null ? '0$' : `${elemento['precio']}$`;
            $items_lista_productos.querySelector('.contenido_neto').textContent = `${elemento['contenido_neto']}L`;
             //guardamos una copia de la estrutura actual del template en la variable $node
            let $clone = $items_lista_productos.cloneNode(true);
            //Guardamos el nodo en el fragment
            $fragment_list.append($clone);
        })

        //Limpiamos la lista
        $lista_productos_inventario.innerHTML ="";
        //Insertamos el fragment en la lista
        $lista_productos_inventario.append($fragment_list);

    }
}

//Extraemos los datos de todos los productos registrados
const extraer_datos_productos = async (url) => {

    try {
        const res =  await fetch(`${url}?consultar_todos_productos=1`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        datos_productos = data["success"];
        show_lista_productos(data["success"]);
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

//Extraemos los datos de las compras con estatus disponible
const extraer_datos_compras_disponibles = async(url) => {

    try {
        const res = await fetch(`${url}?obtener_compras_con_estatus_disponibles=1`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data =  await res.json();
        return data["success"];
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

//FUNCIONES PARA ACTUALIZAR Y GUARDAR LAS CANTIDADES DISPONIBLES DE LOS PRODUCTOS

const actualizar_estado_compra = async(id_compras,url) => {

    const body = {
        method : 'POST',
        body : JSON.stringify(id_compras)
    };

    try {
        const res = await fetch(`${url}?actualizar_estado_compra=1`,body);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        console.log(data);
    }catch(error){
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

const saveCantidadesDisponibles = async(datos_productos,url) =>{
    
    const body = {
        method : 'POST',
        body : JSON.stringify(datos_productos)
    };

    try {
        const res = await fetch(`${url}?modificar_cantidad_disponible_producto=1`,body);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        console.log(data)
        // if(data['success'] == 1){
        //     let is_actualizado = await actualizar_estado_suministro({datos_suministros},url_suministros);
        //     if(is_actualizado){
        //         swal({
        //             title : "Actualización Exitosa",
        //             // text : "Los Datos del Administrador se ha Modificado Satisfactoriamente",
        //             type: "success"
        //         },
        //         (isConfirm) => {
        //             if (isConfirm) {
        //                 window.location = "inventario";
        //             }
        //         })
        //     }
        // }else if(data['success'] == 0){
        //     swal({
        //         title : "Ocurrio un error durante la actualización",
        //         // text : "Los Datos del Administrador se ha Modificado Satisfactoriamente",
        //         type: "warning"
        //     },
        //     (isConfirm) => {
        //         if (isConfirm) {
        //             window.location = "inventario";
        //         }
        //     })
        // }
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }

}

const obtener_cantidad_productos = async(id_compras,url) => {

    const body = {
        method : 'POST',
        body : JSON.stringify(id_compras)
    };

    try {
        const res = await fetch(`${url}?obtener_cantidades_productos=1`,body);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

const filtar_productos = (array_productos) => {

    //filtramos las compras que tienen registros en la tabla compra_productos
    let array_compras_con_productos = array_productos.filter(element => Object.getPrototypeOf(element[0]) === Array.prototype);

    //Obtenemos los id de los productos que contiene cada compra, sin repeticion
    let array_id_productos_sin_repetir = new Set();
    
    array_compras_con_productos.forEach(element => {
        element[0].forEach(element2 => {
            array_id_productos_sin_repetir.add(element2.productos);
        });   
    });

    //Convertimos a array
    array_id_productos_sin_repetir = Array.from(array_id_productos_sin_repetir);

    return [array_id_productos_sin_repetir, array_compras_con_productos];

}

const sumatoria_cantidades_productos = (array_id_productos_sin_repetir, array_compras_con_productos) => {

    //Creamos un array para guardar los datos los productos con su cantidad
    let productos_cantidad = [];

    array_compras_con_productos.forEach(element => {
        element[0].forEach(element2 => {
            productos_cantidad.push(element2);
        });
    });

    let array = [];//guardaremos objetos que tendran como propiedad el id del producto y la cantidad total que se agregara al inventario

    array_id_productos_sin_repetir.forEach( id =>{
        let contador_cantidad = null;
        productos_cantidad.forEach(element => {
            if(id == element.productos){
                contador_cantidad += Number(element.cantidad_productos);
            }
        });

        let obj = {
            id_producto : id,
            cantidad_total : contador_cantidad
        }
        array.push(obj);
    });

    return array;
}

const actualizar_cantidad_disponible = (cantidades_productos) => {

    //recuperamos los productos a los cuales se les va a actualizar la cantidad disponible
    let productos = [];
    cantidades_productos.forEach(e => {
        productos.push(...datos_productos.filter(e2 => e2.id_producto === e.id_producto));
    });

    //Actualizamos las cantidades disponibles de los productos
    cantidades_productos.forEach(e => {
        productos.forEach(e2 =>{

            if(e.id_producto === e2.id_producto){
                if(e2.cantidad_disponible === null){
                    e2.cantidad_disponible = Number(e.cantidad_total);
                }else{
                    e2.cantidad_disponible = Number(e2.cantidad_disponible)  + Number(e.cantidad_total);
                }
            }
        });
    });

    return productos;
}

d.addEventListener('DOMContentLoaded', async e => {

    if($inventario !== null){

        
        await extraer_datos_productos(url_productos);

        d.addEventListener('click', async(ev) =>{


            if(ev.target.classList.contains('ejecutar')){

                console.log("me ejecute")

                //Obtenemos los datos de las compras con estatus disponible
                let datos_compras_disponible = await extraer_datos_compras_disponibles(url_compra);

        

                //Verificamos si la consulta viene vacia o trajo datos
                if(datos_compras_disponible === 0){
                    alerta({
                        titulo : "No hay compras disponibles",
                        tipo_mensaje : "warning"
                    });
                    return;
                }

                //Extraemos los id's de cada una de las compras disponibles
                let id_compras = datos_compras_disponible.map(compra => Number(compra.id_compra));

                //Obtenemos la cantidad de cada producto relacionado a cada compra
                let cantidades = await obtener_cantidad_productos(
                    {
                        id_compras : id_compras,
                    },
                    url_inventario
                );

                //Creamos un nuevo array y guardamos los productos contenidos en cada compra pero sin repeticion
                let [array_id_productos_sin_repetir, array_compras_con_productos] = filtar_productos(cantidades);

                /*
                    el array "array_id_productos_sin_repetir" tiene los id de lso productos a los cuales se les
                    tiene que modificar la cantidad disponible
                    
                    el array "array_compras_con_productos" tiene todas aquellas compras disponibles que tienen registros en la tabla compra productos

                */
                
                // Obtenemos cual es la cantidad total que se agregara al inventario de cada uno de los productos que se encuentran en las compras

                let cantidades_productos_por_cada_compra = sumatoria_cantidades_productos(array_id_productos_sin_repetir, array_compras_con_productos);
                
                //actualizamos la cantidad disponible de los productos 
                let cantidades_actualizadas = actualizar_cantidad_disponible(cantidades_productos_por_cada_compra);

                //Guardamos las nuevas cantidades disponibles

                //Obtenemos los id de cada una de las compras
                let ids_compras = array_compras_con_productos.map(element => element[1]);
                console.log(ids_compras)

                await Promise.all([
                    saveCantidadesDisponibles({datos_productos : cantidades_actualizadas},url_productos),
                    actualizar_estado_compra({ids_compras},url_inventario),
                ]).then( values => alerta({
                    titulo: "Actualización Exitosa",
                    tipo_mensaje : "success",
                    callback : () => {
                        window.location = 'inventario'
                    }, bool : true
                }));
                
            }
        });
    }
});