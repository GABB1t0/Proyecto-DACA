import {url} from './urls.js';
import { comprobar_permiso_accion } from './controlador_acciones.js';

const {url_cliente,url_sesiones} = url;

const d = document,
$tabListCliente = d.querySelector('#tabListCliente'),
$mdl_list_cliente = d.querySelector('#mdl-list-cliente'),
$searchCliente = d.querySelector('#searchCliente'),
$buscador = d.querySelector('#buscador'),
$buscador2 = d.querySelector('#buscador2'),
$fragment_list_cliente = d.createDocumentFragment();

const showCliente = async (data) => {

    const $template_item_cliente = d.querySelector('#template-item-cliente').content;
    
    if(data.length > 0){
        data.forEach((element)=>{

            $template_item_cliente.querySelector('#name-cliente').textContent = `${element['nombre_empresa']}`;
            $template_item_cliente.querySelector("#span-user-cliente").textContent = `${element['usuario_cliente']}`;
            $template_item_cliente.querySelector('.zmdi-more').dataset.id = element['id_cliente'];
            
            let $node = d.importNode($template_item_cliente,true);
            $fragment_list_cliente.appendChild($node);
    
        });
    
        $mdl_list_cliente.innerHTML = "";
        $mdl_list_cliente.append($fragment_list_cliente);
    }
    
}


const obtener_datos_clientes = async(url) => {

    try {
        const res = await fetch(`${url}?obtener_datos_clientes=1`);
        const data = await res.json();
        showCliente(data);
    } catch (error) {
        console.log(error);
    }

}

const obtener_datos_cliente = async(url,cliente) => {

    try {
        const res = await fetch(`${url}?obtener_datos_cliente=${cliente}`);
        const data = await res.json();
        if(data['success'] == 0){
            swal({
                title : "El Cliente No Se Encuentra Registrado",
                // text : "Los Datos del Administrador se ha Modificado Satisfactoriamente",
                type: "warning"
            },
            (isConfirm) => {
                if (isConfirm) {
                    window.location = "lista_cliente";
                }
            })
        }else{
            showCliente(data);
        }
    } catch (error) {
        console.log(error);
    }

}

const redireccionar = (data) => {
    if(data['data'] !== ""){
        //Redireccionamos
        window.location = "visualizar_cliente";
    }
}

const crearVariableSession = async(id_cliente,url) => {

    try {
        const res = await fetch(`${url}?sesion_cliente=${id_cliente}`);
        const data = await res.json();
        redireccionar(data);
    } catch (error) {
        console.log(error)
    }

}

d.addEventListener('DOMContentLoaded', e=> {

    if($tabListCliente !== null){
        
        obtener_datos_clientes(url_cliente);
        
        d.addEventListener('click', async ev => {

            if(ev.target === $buscador || ev.target === $buscador2){

                if($searchCliente.value !== ""){
                    obtener_datos_cliente(url_cliente,$searchCliente.value);
                }
            }

            if(ev.target.classList.contains('zmdi-more')){
                let permiso_accion = await comprobar_permiso_accion('modificar');
                if(permiso_accion){
                    crearVariableSession(ev.target.dataset.id,url_sesiones);
                }else{
                    alert('No tiene los privilegios para realizar esta accion');
                }
                
            }
        })


    }

})