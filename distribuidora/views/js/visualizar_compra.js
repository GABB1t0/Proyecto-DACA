import {url} from "./urls.js";

const {url_compra,get_sessiones,url_productos} = url;

const d = document,
$visualizar_compra = d.querySelector('#visualizar_compra'),
$lista_compra_productos = d.querySelector('#lista_compra_productos'),
$fragment_compra = d.createDocumentFragment();

//Obtenemos los datos de la tabla compra_productos de una compra especifia
const extraerDatosCompra_productos = async(id_compra,url) => {

    try {
        const res = await fetch(`${url}?obtener_datos_compra_productos=${id_compra}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        return data["success"];
    } catch (error) {
        console.log(error)
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

//Obtenemos los datos de la tabla compra de una compra especifica
const extraerDatosCompra = async(id_compra,url) => {

    try {
        const res = await fetch(`${url}?obtener_datos_compra_especifica=${id_compra}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        return data["success"];
    } catch (error) {
        console.log(error)
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

//Recuperamos el id de la compra por medio de la variable de session creada en php
const extraerIdSession = async(url) => {
    try {
        const res = await fetch(`${url}?extraer_id_visualizar_compra=1`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

//Mostramos los datos de la compra
const show_datos_compra = (data) => {

    if(data.length > 0){
        
        data.forEach(element => {

            d.querySelector('#numero_factura').value = element['numero_factura'];
            d.querySelector('#label_numero_factura').classList.add('is-dirty');
    
            d.querySelector('#numero_control').value = element['numero_control'];
            d.querySelector('#label_numero_control').classList.add('is-dirty');
    
            d.querySelector('#nombre_proveedor').value = element['nombre_proveedor'];
            d.querySelector('#label_nombre_proveedor').classList.add('is-dirty');
    
            d.querySelector('#precio_compra').value = element['precio_total_compra'];
            d.querySelector('#label_precio_compra').classList.add('is-dirty');
    
            d.querySelector('#fecha_compra').value = element['fecha_entrada_compra'];
    
        });
    }    
}

//Mostramos los datos de compra-productos
const show_datos_compra_productos = (data,datos_productos) => {
    
    const $template_items_lista_productos = d.querySelector('#template_items_lista_productos').content;

    data.forEach( (element,index) => {
        $template_items_lista_productos.querySelector('.name_producto').textContent = 
        datos_productos[index]["success"][0]["nombre_producto"];

        $template_items_lista_productos.querySelector('.cod_producto').textContent = 
        datos_productos[index]["success"][0]["codigo_producto"];

        $template_items_lista_productos.querySelector('.stock').textContent = element['cantidad_productos'] ;
        $template_items_lista_productos.querySelector('.price').textContent = element['precio'];

        let $clone = $template_items_lista_productos.cloneNode(true);
        $fragment_compra.append($clone);
    });

    $lista_compra_productos.append($fragment_compra);
}

const extraerDatosProductos = async (id_productos,url) => {

    let body = {
        method : 'POST',
        body : JSON.stringify(id_productos)
    };
    
    try {
        const res = await fetch(`${url}?consultar_datos_productos=1`,body);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        return data["success"];
    } catch (error) {
        console.log(error)
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

d.addEventListener('DOMContentLoaded', async e=> {

    if($visualizar_compra !== null){

        //Extreamos el id de la compra
        let id_compra = await extraerIdSession(get_sessiones);
        //Extraemos los datos de la tabla compras
        let datos_compra = await extraerDatosCompra(id_compra,url_compra);
        //Extraemos los datos de la tabla compra productos
        let datos_compra_productos = await extraerDatosCompra_productos(id_compra,url_compra);

        show_datos_compra(datos_compra);

        if(datos_compra_productos.length > 0){
            let id_productos = datos_compra_productos.map( e => e.productos);
            let datos_productos = await extraerDatosProductos({data : id_productos},url_productos);
            show_datos_compra_productos(datos_compra_productos,datos_productos);
        }
    }
})