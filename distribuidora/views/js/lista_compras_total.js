import {url} from "./urls.js";
import { alerta } from "./utils.js";

const {url_compra, url_sesiones} = url;

const d = document,
$tabListCompras_total = d.querySelector('#tabListCompra_total'),
$lista_compras_total = d.querySelector('#lista_compra_total'),
$search_compra = d.querySelector('#search_compra'),
$buscador =  d.querySelector('#buscador'),
$buscador2 = d.querySelector('#buscador2'),
$fragment_compras = d.createDocumentFragment();
let allCompras = [];

//Mostramos todas las compras
const show_compras = (data_compras) => {

    //enlazamos el template creado en el HTML
    const $template_items_compras_total = d.querySelector('#template-items-suministros-total').content;

    if(data_compras.length > 0){
        
        data_compras.forEach(element => {
            //Insertamos los datos en el template
            $template_items_compras_total.querySelector('.numero_factura').innerHTML =  `<strong>Número de Factura :</strong> ${element['numero_factura']}`;
            $template_items_compras_total.querySelector('.name_proveedor').innerHTML = `<strong>Proveedor :</strong> ${element['nombre_proveedor']}`;
            $template_items_compras_total.querySelector('.numero_control').innerHTML = 
            `<strong>Número de Control :</strong> ${element['numero_control']}`;
            $template_items_compras_total.querySelector('.precio').innerHTML = 
            `<strong>Precio Total (Bs.) :</strong> ${element['precio_total_compra']}`;
            $template_items_compras_total.querySelector('.fecha').innerHTML = 
            `<strong>Fecha de Compra :</strong> ${element['fecha_entrada_compra']}`;
            $template_items_compras_total.querySelector('.btn-success').dataset.id = element['id_compra'];
             //guardamos una copia de la estrutura actual del template en la variable $node
            let $clone = $template_items_compras_total.cloneNode(true);
            //Guardamos el nodo en el fragment
            $fragment_compras.append($clone);
    
        });

        //Limpiamos la lista
        $lista_compras_total.innerHTML = "";
        //Insertamos el fragment en la lista
        $lista_compras_total.append($fragment_compras);

    }else{
        //Limpiamos la lista
        $lista_compras_total.innerHTML = "";
    }
    
}

//Extraemos todas las compras registradas
const extraer_todas_compras = async(url) => {

    try {
        const res = await fetch(`${url}?obtener_todas_las_compras=1`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data =  await res.json();
        if(data["success"] != 0){
            allCompras = [...data["success"]];//Guardamos los datos de todas las compras
            show_compras(data["success"]);
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
        show_compras([compra]);
    }else{
        alerta({
            titulo : "La Compra No Se Encuentra Registrada",
            tipo_mensaje : "error"
        })
    }
}

//Main
d.addEventListener('DOMContentLoaded', e=> {

    if($tabListCompras_total !== null){

        extraer_todas_compras(url_compra);

        d.addEventListener('click', ev => {
            //Visualiza compra
            if(ev.target.classList.contains('btn-success')){
                crear_variable_session_compra(ev.target.dataset.id, url_sesiones,'variable_session_id_compra_visualizar','visualizar_compra');
            }

            //Buscar compra
            if(ev.target === $buscador || ev.target === $buscador2){
                if($search_compra.value !== ""){
                    extraer_datos_compra_especifica($search_compra.value);
                }
            }
        });
    }
});