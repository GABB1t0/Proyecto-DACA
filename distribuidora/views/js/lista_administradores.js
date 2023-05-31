import {url} from "./urls.js";
import { alerta } from "./utils.js";
import { validar_usuario } from "./validaciones.js";
import { comprobar_permiso_accion } from "./controlador_acciones.js";

const {url_administradores,url_sesiones} = url;

const d = document,
$tabListAdmin = d.querySelector('#tabListAdmin'),
$mdl_list = d.querySelector('#mdl-list'),
$searchAdmin = d.querySelector('#searchAdmin'),
$buscador =  d.querySelector('#buscador'),
$buscador2 = d.querySelector('#buscador2'),
$fragment_list_admin = d.createDocumentFragment();

 //Redirigimos a la ventana de modificar administradores;
const redirigir_A_modificar = async () => {
    window.location = 'update_administrador';
}

 /* Utilizamos el id del administrador para generar una variable de session en php
    y persistir los datos para luego usarlos en la ventana de modificar administradores */
const generarVariableSesionAdministradores = async(id, url) => {
    try {
        const res = await fetch(`${url}?sesion_administrador=${id}`);
        if(!res.ok) throw {status: res.status, statusText: res.statusText};
        const data = await(res.json());
        if(data !== null){
           redirigir_A_modificar();  
        }
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

//Mostramos los datos de los administradores
const showAllAdmin = async (data) => {

    //enlazamos el template creado en el HTML
    const $template_item_administrador = d.querySelector('#template-item-administrador').content;
    
    if(data.length > 0){

        data.forEach((element)=>{
            //Insertamos los datos en el template
            $template_item_administrador.querySelector('#name-admin').textContent = `${element['nombre']} ${element['apellido']}`;
            $template_item_administrador.querySelector("#span-user-admin").textContent = `${element['usuario']}`;
            $template_item_administrador.querySelector('.zmdi-more').dataset.id = element['id_usuario'];
            //guardamos una copia de la estrutura actual del template en la variable $node
            let $node = d.importNode($template_item_administrador,true);
            //Guardamos el nodo en el fragment
            $fragment_list_admin.appendChild($node,true);
        });
        
        //Limpiamos la lista
        $mdl_list.innerHTML = "";
        //Insertamos el fragment en la lista
        $mdl_list.append($fragment_list_admin);
    }
}

//Extraemos los datos de los administradores
const getAlldataAdmin = async (url) => {
    try {
        const res = await fetch(`${url}?consultar_todos_administradores=1`);
        if(!res.ok) throw {status: res.status, statusText: res.statusText};
        const data = await res.json();
        //Verificamos si la consulta trae administradores para mostrar
        if(data['success'] == 0){
            alerta({
                titulo : '¡No hay Administradores registrados!',
                tipo_mensaje : "warning"
            })
        }else{
            showAllAdmin(data['success']);
        }
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

//Extraemos lso datos de un administrador especifico
const buscar_administrador = async (usuario_administrador, url) => {
    try {
        const res = await fetch(`${url}?consultar_administrador_por_usuario=${usuario_administrador}`);
        if(!res.ok) throw {status: res.status, statusText: res.statusText};
        const data = await res.json();
        if(data['success'] == 0){
            alerta({
                titulo : "¡El Administrador No Se Encuentra Registrado!",
                tipo_mensaje :  "warning",
            });
            $searchAdmin.value = "";
        }else{
            
            //En caso de fallar la validacion en el backend se envia un alerta y se detiene la busqueda
            if(typeof data['success'][0] === "string"){
                alerta({
                    titulo: "Error",
                    mensaje : data["success"][0],
                    tipo_mensaje: "error",
                });
                data['success'][1] !== '' ? d.querySelector(`#${data['success'][1]}`).parentElement.parentElement.classList.add('is-invalid') : "";
            }else{
                //Mostramos los datos
                showAllAdmin(data["success"]);
            }
        }
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

d.addEventListener('DOMContentLoaded', e => {

    if($tabListAdmin !== null){
        getAlldataAdmin(url_administradores)

        d.addEventListener('click', async ev => {

            if(ev.target.classList.contains('zmdi-more')){
                let permiso_accion = await comprobar_permiso_accion('modificar');
                if(permiso_accion){
                    generarVariableSesionAdministradores(ev.target.dataset.id,url_sesiones);
                }else{
                    alert('No tiene los privilegios para realizar esta accion');
                }
                
            }

            if(ev.target === $buscador || ev.target === $buscador2){
                if($searchAdmin.value !== ""){
                    if(!validar_usuario($searchAdmin)){
                        return;
                    }
                    buscar_administrador($searchAdmin.value,url_administradores);
                }
            }
        });
    }
});


    



