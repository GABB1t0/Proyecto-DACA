import {url} from "./urls.js";
import { alerta } from "./utils.js";
import { validarNumeros, validarCamposVacios, validarExpresion, validarImagen } from "./validaciones.js";


const {get_sessiones,url_productos} = url;

const d = document,
$updateBarCode = d.querySelector('#updateBarCode');
let url_image = null;

//Mostramos los datos del producto
const showDataProductos = (data_producto) => {

    //ES MALA PRACTICA, YA LO SÉ
    if(data_producto.length > 0) {
        
        data_producto.forEach(element => {
        
            d.querySelector('#updateBarCode').value = element['codigo_producto'];
            d.querySelector('#label_codigo_producto').classList.add('is-dirty');
            
            d.querySelector('#updateNameProduct').value = element['nombre_producto']; 
            d.querySelector('#label_nombre_producto').classList.add('is-dirty');
    
            d.querySelector('#update_contenidoNeto').value = element['contenido_neto']; 
            d.querySelector('#label_update_contenidoNeto').classList.add('is-dirty');
    
            d.querySelector('#update_estatusProducto').value = element['estatus']; 
            d.querySelector('#label_estatus_producto').classList.add('is-dirty');
            
            d.querySelector('#update_is_venta').value = element['en_Venta'] == 0 ? 2 : element['en_Venta']; 
            d.querySelector('#label_is_venta').classList.add('is-dirty');
    
            d.querySelector('#update_precio').value = element['precio'] === null ? 0 : element['precio']; 
            d.querySelector('#label_update_precio').classList.add('is-dirty');
    
            d.querySelector('#update_tipo').value = element['grabado_excento'];
        });
    }
}

//Recuperamos los datos del producto utilizando el id recuperado
const getDataProductos =  async(id_producto,url) => {
    
    try {
        const res = await fetch(`${url}?consultar_producto=${id_producto}`);
        if(!res.ok) throw {status:res.status, statusText:res.statusText};
        const data = await(res.json());
        if(typeof data['success'][0] === "string"){
            alerta({
                titulo: "Error",
                mensaje : data["success"][0],
                tipo_mensaje: "error",
            });
        }else{
            showDataProductos(data['success']);
        } 
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

//Recuperamos el id del producto por medio de la variable de session creada en php
const extraerIdSession = async() => {
    try {
        const res = await fetch(`${get_sessiones}?extraer_id_producto_session=1`);
        if(!res.ok) throw {status:res.status, statusText:res.statusText};
        const data = await(res.json());
        url_image = data['url_image'];
        getDataProductos(data,url_productos);
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

//////Guardar datos del producto ///////////
const save_producto = async (data_productos, url) => {

    const body = {
        method : 'POST',
        body : JSON.stringify(data_productos),
    }

    try {
        const res = await fetch(`${url}?modificar_producto=1`,body);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data =  await res.json();
        if(data['success'] == 1){
            alerta({
                titulo : "Modificación Exitosa",
                mensaje : "El Producto se ha Modificado Satisfactoriamente",
                tipo_mensaje : "success",
                callback : () => {
                    window.location = "lista_productos";
                },
                bool :true
            })
        }else{
            alerta({
                titulo: "Error",
                mensaje : data["success"][0],
                tipo_mensaje: "error",
            });
            data['success'][1] !== '' ? d.querySelector(`#${data['success'][1]}`).parentElement.classList.add('is-invalid') : "";
        }
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

d.addEventListener('DOMContentLoaded', e => {

    if($updateBarCode !== null){
        
        extraerIdSession();
    
        d.addEventListener('submit', ev => {

            ev.preventDefault();
            ev.stopPropagation();

            //Extraemos los datos del formulario
            let codigo_producto = d.querySelector('#updateBarCode');
            let nombre_producto = d.querySelector('#updateNameProduct');
            let contenido_neto = d.querySelector('#update_contenidoNeto');
            let estatus_producto =  d.querySelector('#update_estatusProducto');
            let imagen_producto = d.querySelector('#update_imagen_producto');
            let is_venta = d.querySelector('#update_is_venta');
            let precio = d.querySelector('#update_precio');
            let tipo = d.querySelector('#update_tipo');
           
            let data_imagen = imagen_producto.files[0];

            let arrayInputs = [codigo_producto,nombre_producto,contenido_neto,estatus_producto,tipo,is_venta,precio];

             //Validamos datos del formulario
            if(!validarCamposVacios(arrayInputs) || !validarNumeros(codigo_producto) || !validarExpresion(nombre_producto) || !validarNumeros(contenido_neto) || !validarNumeros(estatus_producto) ||
            !validarNumeros(tipo)){
                return;
            }

            if(data_imagen !== undefined){
                if(!validarImagen(data_imagen)){
                    return;
                }
            }else{
                data_imagen = url_image;
            }

            const data = {
                codigo_producto : codigo_producto.value,
                nombre_producto : nombre_producto .value,
                contenido_neto : contenido_neto.value,
                estatus_producto : estatus_producto.value,
                is_venta : is_venta.value,
                precio : precio.value,
                tipo : tipo.value
            }

            save_producto(data,url_productos);
        })
    }    

})