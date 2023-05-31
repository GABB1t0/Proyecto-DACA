import { url } from "./urls.js";
import { helpHttp } from "./ApiFetch.js";

const { get_sessiones, delete_sessiones } = url;

const d = document,
$registrar_usuario = d.querySelector('#registrar_usuario'),
$login_usuario = d.querySelector('#login_usuario');

const verificar_usuario_logeado = async () => {

    if($login_usuario.innerHTML == 'LOG OUT'){

        //Cerrar Sesion en php, borrar datos del localStorage y redigir al home

        let apiFetch = helpHttp();

        //Eliminamos session en php
        let is_borrar_session_user = await apiFetch.get(`${delete_sessiones}?cerrarSesion=1`);

        if(is_borrar_session_user.success !== ""){
            
            //Eliminamos data del localStorage
            localStorage.removeItem('datos_user_cliente');

            //Redireccionamos al home
            window.location = 'main';
        }

    }else if($login_usuario.innerHTML == 'LOG IN'){
        //Redirigir al modulo login
        window.location = 'login';
    }

}

d.addEventListener('click', async e => {

    if(e.target === $registrar_usuario){
        e.preventDefault();
        console.log('me quiero registrar');
    }

    if(e.target === $login_usuario){
        e.preventDefault();
        await verificar_usuario_logeado();
    }

})




/**
 * 
 * 
 * try {
        
        const res = await fetch(`${url}?comprobar_session_cliente=1`);
        const data =  await res.json();
        console.log(data);
        //Verificamos si hay session iniciada
        if(data.success === 0){
            //No hay session
            window.location = 'login';
        }else{
            //Hay session iniciada
            window.location = 'main';
        }

    } catch (error) {
        console.log(error);
    }
 */


