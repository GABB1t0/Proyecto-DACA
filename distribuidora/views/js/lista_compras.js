import {url} from "./urls.js";
import {alerta} from "./utils.js";
import { comprobar_permiso_accion } from "./controlador_acciones.js";

const {url_compra,url_sesiones} = url;

const d = document,
$tabListCompras = d.querySelector('#tabListCompras'),
$lista_compras_disponibles = d.querySelector('#lista_compras_disponibles'),
$search_compras_disponible = d.querySelector('#search_compra_disponible'),
$buscador = d.querySelector('#buscador'),
$buscador2 = d.querySelector('#buscador2'),
$fragment_compras = d.createDocumentFragment();
let allCompras = [];

//Mostramos todas las compras
const show_compras_disponibles = (data_compras) => {

    //enlazamos el template creado en el HTML
    const $template_items_compras_disponibles = d.querySelector('#template-items-compras-disponibles').content;

    if(data_compras.length > 0){

        data_compras.forEach(element => {
            //Insertamos los datos en el template
            $template_items_compras_disponibles.querySelector('.numero_factura').innerHTML =  `<strong>Número de Factura :</strong> ${element['numero_factura']}`;
            $template_items_compras_disponibles.querySelector('.name_proveedor').innerHTML = `<strong>Proveedor :</strong> ${element['nombre_proveedor']}`;
            $template_items_compras_disponibles.querySelector('.numero_control').innerHTML = 
            `<strong>Número de Control :</strong> ${element['numero_control']}`;
            $template_items_compras_disponibles.querySelector('.precio').innerHTML = 
            `<strong>Precio Total (Bs.) :</strong> ${element['precio_total_compra']}`;
            $template_items_compras_disponibles.querySelector('.fecha').innerHTML = 
            `<strong>Fecha de Compra :</strong> ${element['fecha_entrada_compra']}`;
            $template_items_compras_disponibles.querySelector('.btn-info').dataset.id = element['id_compra'];
            $template_items_compras_disponibles.querySelector('.btn-danger').dataset.id = element['id_compra'];
            $template_items_compras_disponibles.querySelector('.btn-success').dataset.id = element['id_compra'];
             //guardamos una copia de la estrutura actual del template en la variable $node
            let $clone = $template_items_compras_disponibles.cloneNode(true);
            //Guardamos el nodo en el fragment
            $fragment_compras.append($clone);

        });
        //Limpiamos la lista
        $lista_compras_disponibles.innerHTML = "";
        //Insertamos el fragment en la lista
        $lista_compras_disponibles.append($fragment_compras);

    }else{
        //Limpiamos la lista
        $lista_compras_disponibles.innerHTML = "";
    }
}

//Extraemos todas las compras registradas con estatus disponible
const extraer_datos_compras_con_estatus_disponible = async(url) => {

    try {
        const res = await fetch(`${url}?obtener_compras_con_estatus_disponibles=1`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data =  await res.json();
        console.log(data);
        if(data["success"] != 0){
            allCompras = [...data["success"]];
            show_compras_disponibles(data['success']);
        }
    } catch (error) {
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

//Extraemos y mostramos los datos de  compra especifica
const extraer_datos_compra_especifica = async(numero_factura) => {

    let compra = null;

    for (let i = 0; i < allCompras.length; i++) {
        if(numero_factura === allCompras[i].numero_factura){
            compra = allCompras[i];
            break;
        }
    }

    if(compra !== null){
        show_compras_disponibles([compra]);
    }else{
        alerta({
            titulo : "La Compra No Se Encuentra Registrada",
            tipo_mensaje : "error"
        })
    }
}

//Mensaje de confirmacion
const confirmar_eliminacion = (id_compra, url) => {

    swal({
        title: '¿Esta seguro de eliminar la compra?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, exit',
        closeOnConfirm: false
    },
    (isConfirm) => {
        if (isConfirm) {
            eliminar_compra(id_compra,url);
        }
    });
}

//Eliminar  compra
const eliminar_compra = async (id_compra, url) => {

    try {
        const res = await fetch(`${url}?recibimimos_datos_compra_eliminar=${id_compra}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        console.log(data)
        if(data['success'] == 1){
            window.location = "lista_compra_disponible";
        }
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

//Guardamos el id de la compra en una variable session de php
const crear_variable_session_compra  = async(id_compra,url,variable_get,direccion) => {

    try {
        const res = await fetch(`${url}?${variable_get}=${id_compra}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        if(data.data !== ""){
            window.location = direccion;
        }
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

//Main
d.addEventListener('DOMContentLoaded', e=> {

    if($tabListCompras !== null){

        extraer_datos_compras_con_estatus_disponible(url_compra);

        d.addEventListener('click', async ev => {

            //Modificar compra
            if(ev.target.classList.contains('btn-info')){
                //Verificamos si el administrador tiene los privilegios para eliminar
                let permiso_accion = await comprobar_permiso_accion('modificar');
                if(permiso_accion){
                    crear_variable_session_compra(ev.target.dataset.id,url_sesiones,'variable_session_id_compra_modificar','modificar_compra');
                }else{
                    alert('No tiene los privilegios para realizar esta accion');
                }
                
            }

            //Borrar  compra
            if(ev.target.classList.contains('btn-danger')){  
                //Verificamos si el administrador tiene los privilegios para eliminar
                let permiso_accion = await comprobar_permiso_accion('eliminar');
                if(permiso_accion){
                    confirmar_eliminacion(ev.target.dataset.id,url_compra);
                }else{
                    alert('No tiene los privilegios para realizar esta accion');
                }
            }

            //Visualiza compra
            if(ev.target.classList.contains('btn-success')){
                //Verificamos si el administrador tiene los privilegios para eliminar
                let permiso_accion = await comprobar_permiso_accion('buscar');
                if(permiso_accion){
                    crear_variable_session_compra(ev.target.dataset.id, url_sesiones,'variable_session_id_compra_visualizar','visualizar_compra');
                }else{
                    alert('No tiene los privilegios para realizar esta accion');
                }
                
            }

            //buscar compra
            if(ev.target === $buscador || ev.target === $buscador2){
                if($search_compras_disponible.value !== ""){
                    //Verificamos si el administrador tiene los privilegios para eliminar
                    let permiso_accion = await comprobar_permiso_accion('buscar');
                    if(permiso_accion){
                        let numero_factura = $search_compras_disponible.value;                  
                        extraer_datos_compra_especifica(numero_factura);
                    }else{
                        alert('No tiene los privilegios para realizar esta accion');
                    }
                    
                }
            }
        });
    }
});